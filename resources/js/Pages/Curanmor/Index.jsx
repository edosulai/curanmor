import React, { useState } from "react";
import ReactDOM from "react-dom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import { Head, Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Index({ data, auth, status, asset_url }) {
    const columnsSelector = (cellValue, href) => (
        <Link
            className="flex items-center cursor-pointer w-full"
            href={route("dashboard.edit", href)}
        >
            {cellValue}
        </Link>
    );

    const dateTimeFormat = (value) =>
        new Date(value).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

    const newData = _.map(data, (item, index) => {
        return {
            no: index + 1,
            ...item,
        };
    });

    const columns = [
        {
            name: "No",
            cell: (row) =>
                ((cellValue, href) => (
                    <Link
                        className="flex items-center cursor-pointer w-4"
                        href={route("dashboard.edit", href)}
                    >
                        {cellValue}
                    </Link>
                ))(row.no, row.id),
            selector: (row) => row.no,
            width: "fit-content",
            sortable: true,
        },
        // {
        //     name: "No Laporan",
        //     cell: (row) => columnsSelector(row.no_laporan, row.id),
        //     selector: (row) => row.no_laporan,
        //     sortable: true,
        // },
        {
            name: "Nama/No.HP Pelapor",
            cell: (row) =>
                columnsSelector(
                    `${row.nama_pelapor} / ${row.nohp_pelapor}`,
                    row.id
                ),
            selector: (row) => `${row.nama_pelapor} / ${row.nohp_pelapor}`,
            sortable: true,
        },
        {
            name: "Nama Terlapor",
            cell: (row) => columnsSelector(row.nama_terlapor, row.id),
            selector: (row) => row.nama_terlapor,
            sortable: true,
        },
        {
            name: "Jenis Perkara",
            cell: (row) => columnsSelector(row.jenis_perkara, row.id),
            selector: (row) => row.jenis_perkara,
            sortable: true,
        },
        {
            name: "Jenis/No Laporan",
            cell: (row) =>
                columnsSelector(
                    `${row.jenis_laporan} / ${row.no_laporan}`,
                    row.id
                ),
            selector: (row) => `${row.jenis_laporan} / ${row.no_laporan}`,
            sortable: true,
        },
        {
            name: "Waktu Melapor",
            cell: (row) =>
                columnsSelector(dateTimeFormat(row.waktu_melapor), row.id),
            selector: (row) => dateTimeFormat(row.waktu_melapor),
            sortable: true,
        },
        {
            name: "Waktu Kejadian",
            cell: (row) =>
                columnsSelector(dateTimeFormat(row.waktu_kejadian), row.id),
            selector: (row) => dateTimeFormat(row.waktu_kejadian),
            sortable: true,
        },
        {
            name: "Nama Penyidik & Pembantu",
            cell: (row) =>
                columnsSelector(
                    `${row.nama_penyidik} & ${row.nama_penyidik_pembantu}`,
                    row.id
                ),
            selector: (row) =>
                `${row.nama_penyidik} & ${row.nama_penyidik_pembantu}`,
            sortable: true,
        },
    ];

    const [searchText, setSearchText] = useState("");

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = newData.filter((item) =>
        Object.keys(item).some(
            (key) =>
                item[key] &&
                item[key]
                    .toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
        )
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Tabel PERKARA
                    </h2>
                    <div className="space-x-4 -my-px ml-10 flex">
                        <Link
                            href={route("dashboard.new")}
                            className="rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out"
                        >
                            Tambah Data
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="PERKARA" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <DataTable
                                // title="Tabel PERKARA"
                                columns={columns}
                                data={filteredData}
                                pagination={true}
                                dense={true}
                                highlightOnHover={true}
                                pointerOnHover={true}
                                striped={true}
                                responsive={true}
                                expandableRows={true}
                                subHeader={true}
                                subHeaderComponent={
                                    <TextInput
                                        id="search_input"
                                        type="text"
                                        name="search_input"
                                        className="block w-full"
                                        isFocused={true}
                                        handleChange={handleSearch}
                                        placeholder="Search"
                                    />
                                }
                                expandableRowsComponent={({ data }) => (
                                    <div className="py-10 flex justify-center">
                                        <div className="flex gap-6 justify-center max-w-screen-xl">
                                            <div className="basis-5/12">
                                                <DataTable
                                                    // className="w-9"
                                                    title="Detail Data"
                                                    columns={[
                                                        {
                                                            selector: (row) =>
                                                                row.header,
                                                            width: "120px",
                                                            cell: (row) => (
                                                                <div className="whitespace-normal">
                                                                    {row.header}
                                                                </div>
                                                            ),
                                                        },
                                                        {
                                                            selector: (row) =>
                                                                row.value,
                                                            cell: (row) => (
                                                                <div className="whitespace-normal">
                                                                    {row.value}
                                                                </div>
                                                            ),
                                                        },
                                                    ]}
                                                    data={_.map(
                                                        _.pick(data, [
                                                            "nama_pelapor",
                                                            "nohp_pelapor",
                                                            "nama_terlapor",
                                                            "jenis_perkara",
                                                            "jenis_laporan",
                                                            "no_laporan",
                                                            "waktu_melapor",
                                                            "waktu_kejadian",
                                                            "tkp",
                                                            "kronologis",
                                                            "nama_penyidik",
                                                            "nama_penyidik_pembantu",
                                                            "perkembangan_perkara",
                                                            "keterangan",
                                                        ]),
                                                        (value, key) => ({
                                                            header: _.startCase(
                                                                key
                                                            ),
                                                            value: value,
                                                        })
                                                    )}
                                                    highlightOnHover={true}
                                                    striped={true}
                                                    responsive={true}
                                                />
                                            </div>
                                            <div className="basis-7/12">
                                                <div class="flex items-center justify-between w-full flex-wrap text-[22px] mt-3 mb-[62px]">
                                                    Detail Gambar
                                                </div>
                                                <Carousel>
                                                    {[
                                                        {
                                                            name: "Laporan",
                                                            img: data.gambar_laporan,
                                                        },
                                                        {
                                                            name: "Kerugian",
                                                            img: data.gambar_kerugian,
                                                        },
                                                        {
                                                            name: "Barang Bukti",
                                                            img: data.gambar_barang_bukti,
                                                        },
                                                    ].map((each) => (
                                                        <div className="bg-blue-300 rounded-xl hover:shadow-xl overflow-hidden relative">
                                                            <div className="absolute p-4 z-20 h-full w-full justify-end flex flex-col">
                                                                <div className="p-2 rounded-xl w-full hover:shadow-xl backdrop-blur-sm bg-gray-800/50 self-end border-gray-400/80 border mb-7">
                                                                    <h1 className="text-white font-bold text-3xl">
                                                                        {
                                                                            each.name
                                                                        }
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                            <img
                                                                className="w-full"
                                                                src={`${asset_url}storage/images/${each.img}`}
                                                                alt={each.name}
                                                            />
                                                        </div>
                                                    ))}
                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import TextInput from "@/Components/TextInput";

export default function Index({ data, auth, status }) {
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
                                    <pre>{JSON.stringify(data, null, 2)}</pre>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

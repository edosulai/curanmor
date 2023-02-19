import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ReactDOMServer from "react-dom/server";
import Table from "@/Components/Table";
import CetakTable from "@/Components/CetakTable";

export default function Index({ data, auth, status }) {
    const celltoLink = function (data, td, rowIndex, cellIndex) {
        return ReactDOMServer.renderToString(
            <Link
                className="flex items-center cursor-pointer px-4 py-2"
                href={route("dashboard.edit", data[1])}
                tabIndex="-1"
            >
                {data[0]}
            </Link>
        );
    };

    const columnSetting = [
        { from: "No", to: "No", select: 0, sort: "asc", render: celltoLink },
        {
            from: "no_laporan",
            to: "No Laporan",
            select: 1,
            render: celltoLink,
        },
        {
            from: "jenis_laporan",
            to: "Jenis Laporan",
            select: 2,
            render: celltoLink,
        },
        {
            from: "hari_kejadian",
            to: "Hari Kejadian",
            select: 3,
            render: (data, td, rowIndex, cellIndex) =>
                ReactDOMServer.renderToString(
                    <Link
                        className="flex items-center cursor-pointer px-4 py-2"
                        href={route("dashboard.edit", data[1])}
                        tabIndex="-1"
                    >
                        {new Date(data[0]).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </Link>
                ),
        },
        {
            from: "pelapor",
            to: "Pelapor",
            select: 4,
            render: celltoLink,
        },
        {
            from: "jenis_motor",
            to: "Jenis Motor",
            select: 5,
            render: celltoLink,
        },
        {
            from: "barang_bukti",
            to: "Barang Bukti",
            select: 6,
            render: celltoLink,
        },
        {
            from: "kronologis",
            to: "Kronologis",
            select: 7,
            render: celltoLink,
        },
        { from: "id", to: "id", select: 8, hidden: true },
    ];

    const filteredData = _.map(data, (obj) =>
        _.pick(obj, _.map(columnSetting, "from"))
    );

    const fromTo = _.map(filteredData, (obj) =>
        _.reduce(
            columnSetting,
            (result, m) => {
                result[m.to] = obj[m.from];
                return result;
            },
            {}
        )
    );

    const dataWithIndex = _.map(fromTo, (item, index) =>
        _.extend({}, item, {
            No: String(index + 1).padStart(
                fromTo.length.toString().length,
                "0"
            ),
        })
    );

    const newData = _.map(dataWithIndex, function (obj) {
        return _.mapValues(obj, function (value, key) {
            if (key === "id") {
                return;
            }
            return [value, obj.id];
        });
    });

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                        Tabel Curanmor
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
            <Head title="Curanmor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <div className="overflow-x-scroll">
                                <Table
                                    data={newData}
                                    columns={columnSetting}
                                    tops={[
                                        {
                                            element: CetakTable,
                                            context: {
                                                nama: "Laporan Data Curanmor",
                                                tombol: "Cetak Laporan Curanmor",
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

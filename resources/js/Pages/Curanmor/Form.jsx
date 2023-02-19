import moment from "moment";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import TextAreaInput from "@/Components/TextAreaInput";
import DateInput from "@/Components/DateInput";

export default function Form({ auth, status, title, curanmor = null }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const useFormInertia = useForm({
        no_laporan: curanmor ? curanmor.no_laporan : "",
        jenis_laporan: curanmor ? curanmor.jenis_laporan : "Pencurian",
        hari_kejadian: curanmor
            ? moment.utc(curanmor.hari_kejadian).toDate()
            : new Date(),
        pelapor: curanmor ? curanmor.pelapor : "",
        jenis_motor: curanmor ? curanmor.jenis_motor : "Gigi",
        barang_bukti: curanmor ? curanmor.barang_bukti : "",
        kronologis: curanmor ? curanmor.kronologis : "",
    });

    const { data, setData, processing, errors, reset } = useFormInertia;

    const submit = (e) => {
        e.preventDefault();

        if (curanmor) {
            useFormInertia.patch(route("dashboard.edit", curanmor.id));
        } else {
            console.log("awd");
            useFormInertia.post(route("dashboard.new"));
        }
    };

    useEffect(() => {
        return () => {
            reset(
                "no_laporan",
                "jenis_laporan",
                "hari_kejadian",
                "pelapor",
                "jenis_motor",
                "barang_bukti",
                "kronologis"
            );
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        forInput="no_laporan"
                                        value="No Laporan"
                                    />

                                    <TextInput
                                        id="no_laporan"
                                        type="text"
                                        name="no_laporan"
                                        value={data.no_laporan}
                                        className="mt-1 block w-full"
                                        autoComplete="no_laporan"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.no_laporan}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="jenis_laporan"
                                        value="Jenis Laporan"
                                    />

                                    <SelectInput
                                        id="jenis_laporan"
                                        name="jenis_laporan"
                                        value={data.jenis_laporan}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={[
                                            {
                                                label: "Pencurian",
                                                value: "Pencurian",
                                            },
                                            {
                                                label: "Pembobolan",
                                                value: "Pembobolan",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.jenis_laporan}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="hari_kejadian"
                                        value="Hari Kejadian"
                                    />

                                    <DateInput
                                        id="hari_kejadian"
                                        type="hari_kejadian"
                                        name="hari_kejadian"
                                        value={data.hari_kejadian}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.hari_kejadian}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="pelapor"
                                        value="Pelapor"
                                    />

                                    <TextInput
                                        id="pelapor"
                                        type="text"
                                        name="pelapor"
                                        value={data.pelapor}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.pelapor}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="jenis_motor"
                                        value="Jenis Motor"
                                    />

                                    <SelectInput
                                        id="jenis_motor"
                                        name="jenis_motor"
                                        value={data.jenis_motor}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={[
                                            {
                                                label: "Gigi",
                                                value: "Gigi",
                                            },
                                            {
                                                label: "Matic",
                                                value: "Matic",
                                            },
                                            {
                                                label: "Kopling",
                                                value: "Kopling",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="barang_bukti"
                                        value="Barang Bukti"
                                    />

                                    <TextAreaInput
                                        id="barang_bukti"
                                        type="text"
                                        name="barang_bukti"
                                        value={data.barang_bukti}
                                        className="mt-1 block w-full"
                                        rows="3"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.barang_bukti}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="kronologis"
                                        value="Kronologis"
                                    />

                                    <TextAreaInput
                                        id="kronologis"
                                        type="text"
                                        name="kronologis"
                                        value={data.kronologis}
                                        className="mt-1 block w-full"
                                        rows="3"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.kronologis}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    className={
                                        curanmor
                                            ? "flex items-center justify-between mt-4"
                                            : "flex items-center justify-end mt-4"
                                    }
                                >
                                    {curanmor && (
                                        <DangerButton
                                            type="button"
                                            className="mr-4"
                                            processing={processing}
                                            onClick={() =>
                                                setConfirmingDeletion(true)
                                            }
                                        >
                                            Hapus Data
                                        </DangerButton>
                                    )}
                                    <PrimaryButton
                                        className="ml-4"
                                        processing={processing}
                                    >
                                        {curanmor ? "Ubah Data" : "Simpan Data"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {curanmor && (
                <Modal
                    show={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Apakah kamu yakin ingin menghapus data curanmor{" "}
                            <b>{curanmor.no_laporan}</b> ?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 ">
                            Setelah data dihapus, semua sumber daya dan datanya
                            akan dihapus secara permanen.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => setConfirmingDeletion(false)}
                            >
                                Batalkan
                            </SecondaryButton>

                            <DangerButton
                                className="ml-3"
                                processing={processing}
                                onClick={() => {
                                    useFormInertia.delete(
                                        route("dashboard.delete", curanmor.id),
                                        {
                                            preserveScroll: true,
                                            onSuccess: () =>
                                                setConfirmingDeletion(false),
                                        }
                                    );
                                }}
                            >
                                Hapus Data
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}

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
import ImageInput from "@/Components/ImageInput";
import FileInput from "@/Components/FileInput"

export default function Form({ auth, status, title, perkara = null }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const useFormInertia = useForm({
        nama_pelapor: perkara ? perkara.nama_pelapor : "",
        nohp_pelapor: perkara ? perkara.nohp_pelapor : "",
        nama_terlapor: perkara ? perkara.nama_terlapor : "",
        jenis_perkara: perkara ? perkara.jenis_perkara : "Pencurian",
        jenis_laporan: perkara ? perkara.jenis_laporan : "Laporan Polisi",
        gambar_laporan: perkara ? perkara.gambar_laporan : "",
        no_laporan: perkara ? perkara.no_laporan : "",
        waktu_melapor: perkara
            ? moment.utc(perkara.hari_kejadian).toDate()
            : new Date(),
        waktu_kejadian: perkara
            ? moment.utc(perkara.hari_kejadian).toDate()
            : new Date(),
        tkp: perkara ? perkara.tkp : "",
        gambar_kerugian: perkara ? perkara.gambar_kerugian : "",
        gambar_barang_bukti: perkara ? perkara.gambar_barang_bukti : "",
        kronologis: perkara ? perkara.kronologis : "",
        nama_penyidik: perkara ? perkara.nama_penyidik : "",
        nama_penyidik_pembantu: perkara ? perkara.nama_penyidik_pembantu : "",
        perkembangan_perkara: perkara ? perkara.perkembangan_perkara : "LIDIK",
        keterangan: perkara ? perkara.keterangan : "",
    });

    const { data, setData, processing, errors, reset } = useFormInertia;

    const submit = (e) => {
        e.preventDefault();

        if (perkara) {
            useFormInertia.patch(route("dashboard.edit", perkara.id));
        } else {
            useFormInertia.post(route("dashboard.new"));
        }
    };

    useEffect(() => {
        return () => {
            reset(
                "nama_pelapor",
                "nohp_pelapor",
                "nama_terlapor",
                "jenis_perkara",
                "jenis_laporan",
                "gambar_laporan",
                "no_laporan",
                "waktu_melapor",
                "waktu_kejadian",
                "tkp",
                "gambar_kerugian",
                "gambar_barang_bukti",
                "kronologis",
                "nama_penyidik",
                "nama_penyidik_pembantu",
                "perkembangan_perkara",
                "keterangan"
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
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 ">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}
                            <form onSubmit={submit}>
                                <div className="flex gap-2">
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="nama_pelapor"
                                            value="Nama Pelapor"
                                        />

                                        <TextInput
                                            id="nama_pelapor"
                                            type="text"
                                            name="nama_pelapor"
                                            value={data.nama_pelapor}
                                            className="mt-1 block w-full"
                                            autoComplete="nama_pelapor"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.nama_pelapor}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="nohp_pelapor"
                                            value="No. HP Pelapor"
                                        />

                                        <TextInput
                                            id="nohp_pelapor"
                                            type="text"
                                            name="nohp_pelapor"
                                            value={data.nohp_pelapor}
                                            className="mt-1 block w-full"
                                            autoComplete="nohp_pelapor"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.nohp_pelapor}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="nama_terlapor"
                                            value="Nama Terlapor"
                                        />

                                        <TextInput
                                            id="nama_terlapor"
                                            type="text"
                                            name="nama_terlapor"
                                            value={data.nama_terlapor}
                                            className="mt-1 block w-full"
                                            autoComplete="nama_terlapor"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.nama_terlapor}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="jenis_perkara"
                                            value="Jenis Perkara"
                                        />

                                        <SelectInput
                                            id="jenis_perkara"
                                            name="jenis_perkara"
                                            value={data.jenis_perkara}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                            options={[
                                                {
                                                    label: "Pencurian",
                                                    value: "Pencurian",
                                                },
                                                {
                                                    label: "Penganiayaan",
                                                    value: "Penganiayaan",
                                                },
                                                {
                                                    label: "Pembunuhan",
                                                    value: "Pembunuhan",
                                                },
                                                {
                                                    label: "Pengancaman",
                                                    value: "Pengancaman",
                                                },
                                            ]}
                                        />

                                        <InputError
                                            message={errors.jenis_perkara}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <div className="basis-6/12">
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
                                                        label: "Laporan Polisi",
                                                        value: "Laporan Polisi",
                                                    },
                                                    {
                                                        label: "Laporan Pengaduan",
                                                        value: "Laporan Pengaduan",
                                                    },
                                                ]}
                                            />

                                            <InputError
                                                message={errors.jenis_laporan}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="gambar_laporan"
                                            value="Upload Laporan"
                                        />

                                        {/* <ImageInput
                                            id="gambar_laporan"
                                            type="text"
                                            name="gambar_laporan"
                                            value={data.gambar_laporan}
                                            className="mt-1 block w-full"
                                            autoComplete="gambar_laporan"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        /> */}

                                        {/* <FileInput
                                            id="gambar_laporan"
                                            type="text"
                                            name="gambar_laporan"
                                            value={data.gambar_laporan}
                                            className="mt-1 block w-full"
                                            autoComplete="gambar_laporan"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        /> */}

                                        <InputError
                                            message={errors.gambar_laporan}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="waktu_melapor"
                                            value="Waktu Melapor"
                                        />

                                        <DateInput
                                            id="waktu_melapor"
                                            type="waktu_melapor"
                                            name="waktu_melapor"
                                            value={data.waktu_melapor}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.waktu_melapor}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="waktu_kejadian"
                                            value="Waktu Kejadian"
                                        />

                                        <DateInput
                                            id="waktu_kejadian"
                                            type="waktu_kejadian"
                                            name="waktu_kejadian"
                                            value={data.waktu_kejadian}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.waktu_kejadian}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel forInput="tkp" value="TKP" />

                                    <TextAreaInput
                                        id="tkp"
                                        type="text"
                                        name="tkp"
                                        value={data.tkp}
                                        className="mt-1 block w-full"
                                        rows="3"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.tkp}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <div></div>
                                    <div></div>
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

                                <div className="mt-4 flex gap-2">
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="nama_penyidik"
                                            value="Nama Penyidik"
                                        />

                                        <TextInput
                                            id="nama_penyidik"
                                            type="text"
                                            name="nama_penyidik"
                                            value={data.nama_penyidik}
                                            className="mt-1 block w-full"
                                            autoComplete="nama_penyidik"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.nama_penyidik}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="basis-6/12">
                                        <InputLabel
                                            forInput="nama_penyidik_pembantu"
                                            value="Nama Penyidik Pembantu"
                                        />

                                        <TextInput
                                            id="nama_penyidik_pembantu"
                                            type="text"
                                            name="nama_penyidik_pembantu"
                                            value={data.nama_penyidik_pembantu}
                                            className="mt-1 block w-full"
                                            autoComplete="nama_penyidik_pembantu"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={
                                                errors.nama_penyidik_pembantu
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="perkembangan_perkara"
                                        value="Perkembangan Perkara"
                                    />

                                    <SelectInput
                                        id="perkembangan_perkara"
                                        name="perkembangan_perkara"
                                        value={data.perkembangan_perkara}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        options={[
                                            {
                                                label: "LIDIK",
                                                value: "LIDIK",
                                            },
                                            {
                                                label: "SIDIK",
                                                value: "SIDIK",
                                            },
                                            {
                                                label: "P19",
                                                value: "P19",
                                            },
                                            {
                                                label: "P21",
                                                value: "P21",
                                            },
                                        ]}
                                    />

                                    <InputError
                                        message={errors.perkembangan_perkara}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        forInput="keterangan"
                                        value="Keterangan"
                                    />

                                    <TextAreaInput
                                        id="keterangan"
                                        type="text"
                                        name="keterangan"
                                        value={data.keterangan}
                                        className="mt-1 block w-full"
                                        rows="3"
                                        handleChange={onHandleChange}
                                    />

                                    <InputError
                                        message={errors.keterangan}
                                        className="mt-2"
                                    />
                                </div>

                                <div
                                    className={
                                        data
                                            ? "flex items-center justify-between mt-4"
                                            : "flex items-center justify-end mt-4"
                                    }
                                >
                                    {data && (
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
                                        {data ? "Ubah Data" : "Simpan Data"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {data && (
                <Modal
                    show={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 ">
                            Apakah kamu yakin ingin menghapus data data{" "}
                            <b>{data.no_laporan}</b> ?
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
                                        route("dashboard.delete", data.id),
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

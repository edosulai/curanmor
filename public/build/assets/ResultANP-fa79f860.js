import{j as o,a as e,f as d,n as g}from"./app-b7785dc1.js";import{A as p}from"./AuthenticatedLayout-195bbb02.js";import{T as x,C as f,s as N}from"./CetakTable-778a1ecc.js";import"./_commonjsHelpers-042e6b4d.js";import"./ApplicationLogo-dcf0c075.js";import"./transition-937e7a14.js";import"./typeof-f1c20273.js";function A({auth:m,anp:c,status:s}){const t=(a,r,n,b)=>N.renderToString(e("span",{className:"flex items-center px-4 py-2",children:a})),i=[{from:"No",to:"No",select:0,sort:"asc",render:t},{from:"nama_pasien",to:"Nama Pasien",select:1,render:t},{from:"nama_kepala_keluarga",to:"Nama KK",select:2,render:t},{from:"no_kartu",to:"No Kartu",select:3,render:t},{from:"umur",to:"Umur",select:4,render:t},{from:"jenis_kelamin",to:"Jenis Kelamin",select:5,render:t},{from:"status",to:"Status",select:6,render:t},{from:"priority",to:"Tingkat Prioritas",select:7,render:t}],l=_.sortBy(c,"priority").reverse(),h=_.map(l,(a,r)=>_.extend({},a,{No:String(r+1).padStart(l.length.toString().length,"0")})),u=_.map(h,a=>_.reduce(i,(r,n)=>(r[n.to]=a[n.from],r),{}));return o(p,{auth:m,header:o("div",{className:"flex",children:[e("h2",{className:"font-semibold text-xl text-gray-800  leading-tight",children:"Hasil Sorting ANP"}),o("div",{className:"space-x-4 -my-px ml-10 flex",children:[e(d,{href:route("dashboard.new"),className:"rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out",children:"Tambah Kunjungan"}),e(d,{href:route("dashboard.anp"),className:"rounded block px-4 py-2 text-sm leading-5 text-light-700 hover:bg-light-100 focus:outline-none focus:bg-light-10 transition duration-150 ease-in-out",children:"Sorting ANP"})]})]}),children:[e(g,{title:"Hasil Sorting ANP"}),e("div",{className:"py-12",children:e("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white  overflow-hidden shadow-sm sm:rounded-lg",children:o("div",{className:"p-6 text-gray-900",children:[s&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),e("div",{className:"overflow-x-auto",children:e(x,{data:u,columns:i,tops:[{element:f,context:{nama:"Laporan Hasil Sorting Pasien Sesuai Nilai Prioritas",tombol:"Cetak Laporan Prioritas"}}]})})]})})})})]})}export{A as default};

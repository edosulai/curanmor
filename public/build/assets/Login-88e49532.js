import{a as e,_ as h,r as g,j as s,n as b}from"./app-04ac2221.js";import{G as x}from"./GuestLayout-33f934bb.js";import{I as i}from"./InputError-fd1d51cb.js";import{I as c}from"./InputLabel-2f61b891.js";import{P as w}from"./PrimaryButton-a9b1d841.js";import{T as d}from"./TextInput-c5c131e4.js";import"./ApplicationLogo-d90c8b17.js";function N({name:t,value:l,handleChange:r}){return e("input",{type:"checkbox",name:t,value:l,className:"rounded  border-gray-300  text-indigo-600 shadow-sm focus:ring-indigo-500  ",onChange:m=>r(m)})}function P({status:t,canResetPassword:l}){const{data:r,setData:m,post:u,processing:p,errors:n,reset:f}=h({email:"",password:"",remember:""});g.useEffect(()=>()=>{f("password")},[]);const o=a=>{m(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)};return s(x,{children:[e(b,{title:"Log in"}),t&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),s("form",{onSubmit:a=>{a.preventDefault(),u(route("login"))},children:[s("div",{children:[e(c,{forInput:"email",value:"Email"}),e(d,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:o}),e(i,{message:n.email,className:"mt-2"})]}),s("div",{className:"mt-4",children:[e(c,{forInput:"password",value:"Password"}),e(d,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:o}),e(i,{message:n.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:s("label",{className:"flex items-center",children:[e(N,{name:"remember",value:r.remember,handleChange:o}),e("span",{className:"ml-2 text-sm text-gray-600 ",children:"Remember me"})]})}),s("div",{className:"flex items-center justify-end mt-4",children:[!1,e(w,{className:"ml-4",processing:p,children:"Log in"})]})]})]})}export{P as default};

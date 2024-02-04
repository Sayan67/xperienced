"use client";
import React, { useEffect } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiMail, CiLink, CiEdit } from "react-icons/ci";
import OrgProfileEdit from "@/components/OrgProfileEdit";
import { useRouter } from "next/navigation";

//Demo data
let userInfo = [
  {
    org: "Resourcio Community",
    bio: "Resourcio is a community of developers and designers",
    contact: {
      email: "abcd@gmail.com",
      url: "https://www.linkedin.com/in/sayan-daas",
    },
    applications: [
      {
        name: "Sayan Das",
        url: "https://www.linkedin.com/in/sayan-daas",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
      {
        name: "Soumit Srimany",
        url: "https://www.linkedin.com/in/soumit-srimany",
      },
    ],
  },
];

async function getUserData() {
  //fetch data from server
  const response = await axios.get(`http://localhost:8000/api/profile/`);
}

function page() {

  //Router
  const router = useRouter();

  const [isEditing, setIsEditing] = React.useState(false);
  useEffect(() => {
    setIsEditing(false);
  }, []);

  //Function to convert image to base64

  const convertBase64 = (file:any) => new Promise((resolve, reject) => {
    file = file[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


  // const convertBase64 =(file:any) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };


  function uploadSingleImage(base64:any) {
    axios
      .post("http://localhost:8000/api/company/edit/avatar",{ image: base64 },{headers:{crossDomain:true}})
      .then((res) => {
        console.log(res.data);
        alert("Image uploaded Succesfully");
      })
      // .then(router.push("http://localhost:3000/organisations/orgprofile"))
      .catch(console.log);
  }


  const uploadImage = async (event:React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
      const base64 = await convertBase64(files);
      uploadSingleImage(base64);
      return;
  }

  return (
    <>
      <main className="flex flex-col items-center py-5 gap-4 px-[4rem] bg-slate-100 font-primary">
        {/* Left div */}
        <div className=" w-full h-full flex flex-col items-center py-[5rem] pt-0 overflow-hidden rounded-lg bg-opacity-10 border-slate-400 border-[1px] bg-white shadow-md">
          <Image
            src={"/images/banner.jpg"}
            alt="user"
            loading="lazy"
            width={1350}
            height={200}
          ></Image>
          <Avatar className=" -translate-y-28 flex flex-col justify-start items-center">
            <AvatarImage
              src="/images/user.jpg"
              className=" w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] lg:w-[20rem] lg:h-[20rem] rounded-full border-[2px]  border-slate-500"
            ></AvatarImage>
            <div className=" bg-slate-300 w-fit rounded-full p-2 -translate-y-4 cursor-pointer shadow-md hover:bg-slate-400">
            <div className="file_button_container w-fit"><input onChange={(e)=>uploadImage(e)} type="file" /></div>
              {/* <input type="file" onChange={(e)=>uploadImage(e)} className="rounded-full bg-slate-400 w-3"/> */}
              {/* <CiEdit size={20} /> */}
            </div>
          </Avatar>
          {isEditing ? 
          <OrgProfileEdit onSubmit={() => setIsEditing(false)}/>
          :
          <div className="space-y-4 flex flex-col justify-center items-center -translate-y-20">
            {userInfo.map((item) => {
              return (
                <div className="flex flex-col items-start gap-2">
                  <span className="text-slate-400 text-[1rem] ">
                    Organisation
                  </span>
                  <h1 className="text-xl font-semibold -translate-y-2">
                    {item.org}
                  </h1>
                  <br />
                  <span className="text-slate-400 text-[1rem] ">Bio</span>
                  <h1 className="text-xl font-medium -translate-y-2">
                    {item.bio}
                  </h1>
                  <h1 className="text-slate-400 text-[1rem] translate-y-2">
                    Contacts{" "}
                  </h1>
                  <div className="text-lg ">
                    <h1 className="flex items-center gap-2">
                      {" "}
                      <CiMail size={20} /> {item.contact.email}
                    </h1>
                    <h1 className="flex gap-2 items-center">
                      <CiLink size={20} />
                      <Link href={item.contact.url}>{item.contact.url}</Link>
                    </h1>
                  </div>
                </div>
              );
            })}
            <Button className="bg-slate-500 w-full hover:bg-slate-600 text-white" onClick={()=>setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
      }
      </div>
        {/* Right div */}
        <div className=" w-full flex flex-col justify-center items-center">
          <div className="text-[1.2rem] w-[50%] h-fit space-y-4 auto-rows-min rounded-t-lg bg-primary border-slate-500 border-[1px] border-b-0 py-4 px-8 gap-4">
            Applied to :{" "}
          </div>
          <div className="w-[50%] space-y-4 auto-rows-min h-[600px] rounded-b-lg border-slate-500 border-[1px] px-8 py-[6rem] gap-4 overflow-scroll bg-primary">
            {userInfo.map((item) => {
              return item.applications.map((appl) => {
                return (
                  <div className="border-slate-500 border-[1px] rounded-lg px-8 py-8 h-fit">
                    <Link href={appl.url}>{appl.name}</Link>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default page;


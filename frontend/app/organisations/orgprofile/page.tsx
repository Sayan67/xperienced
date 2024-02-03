"use client";
import React, { useEffect } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//Demo data
let userInfo = [
  {
    org: "Resourcio Community",
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
  useEffect(() => {
    //  const token = cookieStore.get("auth_token");//not completed
    //  getUserData(token); //error
  }, []);

  return (
    <>
      <main className="flex flex-col items-center py-5 gap-4 px-[40px]">
        {/* Left div */}
        <div className=" w-full h-full flex flex-col items-center py-[4rem] pt-0 overflow-hidden rounded-lg bg-border bg-opacity-10 border-slate-500 border-[1px] ">
          <Image
            src={"/images/banner.jpg"}
            alt="user"
            loading="lazy"
            width={1400}
            height={200}
          ></Image>
          <Avatar className=" -translate-y-28">
            <AvatarImage
              src="/images/user.jpg"
              className=" w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] lg:w-[20rem] lg:h-[20rem] rounded-full border-[2px]  border-slate-500"
            ></AvatarImage>
          </Avatar>
          <div className="space-y-4 flex flex-col justify-center items-center -translate-y-20">
            {userInfo.map((item) => {
              return (
                <div className="flex flex-col items-center gap-4">
                  <h1 className="text-xl">Organisation name : {item.org}</h1>
                  <br />
                  <h1 className="text-lg">Contacts </h1>
                  <h1>email : {item.contact.email}</h1>
                  <h1>
                    Url :{" "}
                    <Link href={item.contact.url}>{item.contact.url}</Link>
                  </h1>
                  <h1>
                    Linekdin :{" "}
                    <Link href={item.contact.url}>{item.contact.url}</Link>
                  </h1>
                </div>
              );
            })}
            <Button variant={"outline"}>Edit Profile</Button>
          </div>
        </div>
        {/* Right div */}
        <div className=" w-full flex flex-col justify-center items-center">
          <div className="text-[1.2rem] w-[50%] h-fit space-y-4 auto-rows-min rounded-t-lg bg-border border-slate-500 border-[1px] border-b-0 py-4 px-8 gap-4">
            Applied to :{" "}
          </div>
          <div className="w-[50%] space-y-4 auto-rows-min h-[600px] rounded-b-lg bg-border border-slate-500 border-[1px] px-8 py-[6rem] gap-4 overflow-scroll">
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

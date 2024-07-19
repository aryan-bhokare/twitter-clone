"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useGetCurrentUser } from "../hooks/user";
import { BsImage } from "react-icons/bs";
import { AiOutlineFileGif, AiOutlineUnorderedList } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MdEventRepeat } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { useCreateTweet } from "../hooks/tweet";
import { graphqlClient } from "@/clients/api";
import { getTweetImgPresignedUrlQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";

export const TweetModal = () => {
    const { user } = useGetCurrentUser();
    const { mutate } = useCreateTweet();

    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");
    const handleCreateTweet = useCallback(() => {
        mutate({
            imageURL: imageURL,
            content: content,
        });
    }, [mutate, imageURL, content]);

    const handleFileInput = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault();
            const file: File | null | undefined = input.files?.item(0);
            if (!file) return;
            const { getTweetImgPresignedUrl } = await graphqlClient.request(
                getTweetImgPresignedUrlQuery,
                {
                    imgName: file.name,
                    imgType: file.type,
                },
            );
            if (getTweetImgPresignedUrl) {
                toast.loading("Uploading", { id: '2' })
                await axios.put(getTweetImgPresignedUrl, file, {
                    headers: { 'Content-Type': file.type },
                })
                toast.success("Uploaded", { id: '2' })
                const url = new URL(getTweetImgPresignedUrl);

                setImageURL(url.origin + url.pathname);
                console.log(imageURL);
                toast.success("Uploaded", { id: '2' })
            }
        };
    }, []);

    const handleImageUpload = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "images/*");


        input.addEventListener("input", handleFileInput(input))


        input.click();
    }, [handleFileInput]);
    return (
        <section className="h-min-48 grid auto-cols-min grid-cols-12 grid-rows-4 gap-2 border-b-[0.5px] border-b-gray-800 p-4">            {user?.profileImageURL && (
            <Image
                src={user?.profileImageURL}
                width={50}
                height={50}
                alt={"profile image"}
                className="col-span-1 row-span-4 rounded-full"
            />
        )}
            <div className="flex flex-col col-span-11 row-span-3 gap-2 border-b border-b-gray-800 p-2">
                <span className="flex items-center gap-2 font-semibold border border-gray-600 w-max px-4 rounded-full text-blue-400">
                    <span>Everyone</span>
                    <IoIosArrowDown />
                </span>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's happening?"
                    className="bg-black h-20 text-xl"
                />
                {imageURL && (
                    <Image
                        src={imageURL}
                        alt="Uploaded tweet image"
                        height={200}
                        width={300}
                    />
                )}
                <span className="text-blue-400">Everyone can reply</span>
            </div>
            <div className="col-span-11 flex justify-between">
                <div className="flex gap-4 text-xl p-2 font-bold text-blue-400 cursor-pointer">
                    <BsImage onClick={handleImageUpload} />
                    <AiOutlineFileGif />
                    <AiOutlineUnorderedList />
                    <BsEmojiSmile />
                    <MdEventRepeat />
                    <HiOutlineLocationMarker />
                </div>
                <button
                    className="h-10 w-16 font-semibold bg-blue-500 rounded-full cursor-pointer"
                    onClick={handleCreateTweet}
                >
                    Post
                </button>
            </div>
        </section>
    );
};
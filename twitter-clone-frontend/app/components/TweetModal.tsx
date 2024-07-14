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

export const TweetModal = () => {
    const { user } = useGetCurrentUser();
    const { mutate } = useCreateTweet();

    const [content, setContent] = useState("");
    const handleCreateTweet = useCallback(() => {
        mutate({
            content,
        });
    }, [mutate, content]);
    return (
        <section className="grid grid-cols-12 grid-rows-4 h-48 border-b-[0.5px] border-b-gray-800 p-4 gap-2">
            {user?.profileImageURL && (
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
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    placeholder="What's happening?"
                    className="bg-black h-20 text-xl"
                />
                <span className="text-blue-400">Everyone can reply</span>
            </div>
            <div className="col-span-11 flex justify-between">
                <div className="flex gap-4 text-xl p-2 font-bold text-blue-400">
                    <BsImage />
                    <AiOutlineFileGif />
                    <AiOutlineUnorderedList />
                    <BsEmojiSmile />
                    <MdEventRepeat />
                    <HiOutlineLocationMarker />
                </div>
                <button
                    className="w-16 font-semibold bg-blue-500 rounded-full"
                    onClick={handleCreateTweet}
                >
                    Post
                </button>
            </div>
        </section>
    );
};
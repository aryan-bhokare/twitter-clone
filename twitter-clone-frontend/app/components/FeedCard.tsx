
import Image from "next/image";
import React from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { CgPoll } from "react-icons/cg";
import { FiMoreHorizontal, FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface feedCardProps {
	tweet: Tweet;
}

const FeedCard: React.FC<feedCardProps> = ({ tweet }) => {
	// console.log(tweet);

	return (
		<div className="grid cursor-pointer grid-cols-12 gap-3 border-b-[0.5px] border-gray-800 p-4 transition-all hover:bg-gray-900/20">
			{tweet.author?.profileImageURL && (
				<Image
					src={tweet.author.profileImageURL}
					width={50}
					height={50}
					alt="avatar"
					className="col-span-1 rounded-full"
				/>
			)}
			<div className="col-span-11 ">
				<span className="float-right py-1 text-gray-600">
					<FiMoreHorizontal />
				</span>
				<Link href={`/${tweet.author?.id}`}>
					<span className="font-semibold">
						{tweet.author?.firstName} {tweet.author?.lastName}
					</span>
				</Link>
				<span className="mx-3 text-gray-600">@aryan</span>
				<div className="my-1">{tweet.content}</div>
				{
					tweet.imageURL && (
						<Image src={tweet.imageURL} alt="image" width={400} height={400} />
					)
				}
			</div>
			<div className="col-span-11 col-start-2 flex items-center justify-between text-xl text-gray-600">
				<span className="flex items-center gap-2">
					<BiMessageRounded />
					<span className="text-sm">652</span>
				</span>
				<span className="flex items-center gap-2">
					<FaRetweet />
					<span className="text-sm">652</span>
				</span>
				<span className="flex items-center gap-2">
					<AiOutlineHeart />
					<span className="text-sm">652</span>
				</span>
				<span className="flex items-center gap-2">
					<CgPoll />
					<span className="text-sm">652</span>
				</span>
				<FiUpload />
			</div>
		</div>
	);
};

export default FeedCard;

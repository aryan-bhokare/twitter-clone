import { Tweet } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { GraphQLContext } from "../../interfaces";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client(
    {
        credentials: {
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || ''
        },
        region: process.env.AWS_DEFAULT_REGION
    }
);

interface CreateTweetData {
    content: string;
    imageURL?: string;
}

const queries = {
    getAllTweets: () =>
        prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } }),
    getTweetImgPresignedUrl: async (
        parent: any,
        { ImgName, ImgType }: { ImgName: string; ImgType: string },
        ctx: GraphQLContext
    ) => {
        if (!ctx.user || !ctx.user.id)
            throw new Error("Your are not authorized to make this tweet");
        const allowedImgTypes = [
            "image/jpeg",
            "image/jpg",
            "image/webp",
            "image/png",
        ];
        if (!allowedImgTypes.includes(ImgType))
            throw new Error("Image type not supported");

        const putObjectCommand = new PutObjectCommand({
            Bucket: "aryan-twitter-dev",
            Key: `uploads/${ctx.user.id}/${ImgName.split(".")[0]
                }-${Date.now().toString()}.${ImgType.split("/")[1]}`,
        });
        const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
            expiresIn: 300,
        });

        return signedUrl;
    },
};

const mutations = {
    createTweet: async (
        parent: any,
        { payload }: { payload: CreateTweetData },
        ctx: GraphQLContext
    ) => {
        if (!ctx.user?.id) throw new Error("Unauthorized action");
        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user?.id } },
            },
        });
        return tweet;
    },
};

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) =>
            prismaClient.user.findUnique({ where: { id: parent.authorId } }),
    },
};

export const resolvers = { mutations, extraResolvers, queries };
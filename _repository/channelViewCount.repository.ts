import { ServerResponse, ServerResponseError } from "../_entities/serverResponse.entity";
import { ServerResponseStatus } from "../_enums/serverResponse/serverResponseStatus.enum";
import { ChannelViewCountInterface } from "../_interfaces/channelViewCount.interface";
import { prisma } from "../_lib/prisma/prismaProvider.lib";



export class ChannelViewCountRepository implements ChannelViewCountInterface {
    async get(channelName: string): Promise<ServerResponse<number>> {
        try {
            //Check if Channel Eixsts
            const res = await prisma.channel.findFirst({
                where: {
                    channelName: channelName
                },
            });

            if(res){
                //Get Channel View Count
                const channelViewCount = await prisma.channelViewCount.findFirst({
                    where: {
                        channelName: channelName,
                    },
                });

                if(channelViewCount){
                    return new ServerResponse<number>(channelViewCount.viewCount || 0, ServerResponseStatus.SUCCESS);
                } else {
                    //Create Channel View Count and Initialize it at 1
                    const newChannelViewCount = await prisma.channelViewCount.create({
                        data: {
                            channelName: channelName,
                            viewCount: 1,
                        },
                    });
                    return new ServerResponse<number>(1, ServerResponseStatus.SUCCESS);
                };
            } else {
                return new ServerResponse<number>(0, ServerResponseStatus.CLIENTERROR, new ServerResponseError("channelViewCountRepository", "get()", `Channel does not exist`));
            }
        } catch (error) {
            console.error(`${error}`);
            return new ServerResponse<number>(0, ServerResponseStatus.SERVERERROR, new ServerResponseError("channelViewCountRepository", "get()", `${error}`));
        };
    };

    async decrement(channelName: string): Promise<ServerResponse<number>> {
        try {
            //Check if Channel Exists
            const res = await prisma.channel.findFirst({
                where: {
                    channelName: channelName
                },
            });

            if(res){
                //Check if VIewCount exists
                const channelViewCount = await prisma.channelViewCount.findFirst({
                    where: {
                        channelName: channelName,
                    },
                });

                if(channelViewCount && channelViewCount.viewCount !== 0){
                    //Decrement View Count
                    const newChannelViewCount = await prisma.channelViewCount.update({
                        where: {
                            channelName: channelName,
                        },
                        data: {
                            viewCount: {
                                decrement: 1,
                            },
                        },
                    });
                    return new ServerResponse<number>(newChannelViewCount.viewCount, ServerResponseStatus.SUCCESS);
                } else {
                    //Create Channel View Count and Initialize it at 0
                    const newChannelViewCount = await prisma.channelViewCount.create({
                        data: {
                            channelName: channelName,
                            viewCount: 0,
                        },
                    });
                    return new ServerResponse<number>(newChannelViewCount.viewCount, ServerResponseStatus.SUCCESS);
                };
            } else {
                return new ServerResponse<number>(0, ServerResponseStatus.CLIENTERROR, new ServerResponseError("channelViewCountRepository", "decrement()", `Channel does not exist`));
            }
        } catch (error) {
            console.error(error);
            return new ServerResponse<number>(0, ServerResponseStatus.SERVERERROR, new ServerResponseError("channelViewCountRepository", "decrement()", `${error}`));
        };
    };

    async increment(channelName: string): Promise<ServerResponse<number>> {
        try {
            //Check if Channel Exists
            const res = await prisma.channel.findFirst({
                where: {
                    channelName: channelName
                },
            });

            if(res){
                //Check if Channel View Count Exists
                const channelViewCount = await prisma.channelViewCount.findFirst({
                    where: {
                        channelName: channelName,
                    },
                });

                if(channelViewCount){
                    //Increment View Count
                    const newChannelViewCount = await prisma.channelViewCount.update({
                        where: {
                            channelName: channelName,
                        },
                        data: {
                            viewCount: {
                                increment: 1,
                            },
                        },
                    });
                    return new ServerResponse<number>(newChannelViewCount.viewCount, ServerResponseStatus.SUCCESS);
                } else {
                    //Create Channel View Count and Initialize it at 1
                    const newChannelViewCount = await prisma.channelViewCount.create({
                        data: {
                            channelName: channelName,
                            viewCount: 1,
                        },
                    });
                    return new ServerResponse<number>(newChannelViewCount.viewCount, ServerResponseStatus.SUCCESS);
                };
            } else {
                return new ServerResponse<number>(0, ServerResponseStatus.CLIENTERROR, new ServerResponseError("channelViewCountRepository", "increment()", `Channel does not exist`));
            };
        } catch (error) {
            console.error(error);
            return new ServerResponse<number>(0, ServerResponseStatus.SERVERERROR, new ServerResponseError("channelViewCountRepository", "increment()", `${error}`));
        };
    };
};
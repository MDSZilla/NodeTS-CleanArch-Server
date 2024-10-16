import { ServerResponse } from "../_entities/serverResponse.entity";

export interface ChannelViewCountInterface {
    get(channelName: string): Promise<ServerResponse<number>>
    increment(channelName: string): Promise<ServerResponse<number>>
    decrement(channelName: string): Promise<ServerResponse<number>>
    // set(channelName: string, count: number): Promise<ServerResponse<number>>
    // reset(channelName: string): Promise<ServerResponse<number>>
    // resetAll(): Promise<ServerResponse<number[]>
};
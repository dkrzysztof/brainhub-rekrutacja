import { StatusType } from './interfaces/StatusTypes';

export const isInitial = (status: StatusType) => status === StatusType.INITIAL;
export const isLoading = (status: StatusType) => status === StatusType.LOADING;
export const isSuccess = (status: StatusType) => status === StatusType.SUCCESS;
export const isFailed = (status: StatusType) => status === StatusType.FAILED;

import { StatusType } from './interfaces/StatusTypes';

export const isStatusInitial = (status: StatusType) =>
  status === StatusType.INITIAL;
export const isStatusLoading = (status: StatusType) =>
  status === StatusType.LOADING;
export const isStatusSuccess = (status: StatusType) =>
  status === StatusType.SUCCESS;
export const isStatusFailed = (status: StatusType) =>
  status === StatusType.FAILED;

import { UseMutateFunction } from 'react-query';

export type HookAction = {
  action: UseMutateFunction<void, unknown, any, unknown>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

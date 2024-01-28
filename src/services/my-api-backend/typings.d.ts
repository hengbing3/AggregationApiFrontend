declare namespace API {
  type CommonResultInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type CommonResultlong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type CommonResultPageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type CommonResultPageUserInfoVO = {
    code?: number;
    data?: PageUserInfoVO;
    message?: string;
  };

  type CommonResultstring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type CommonResultUserInfoVO = {
    code?: number;
    data?: UserInfoVO;
    message?: string;
  };

  type CommonResultVoid = {
    code?: number;
    message?: string;
  };

  type deleteByIdUsingDELETEParams = {
    /** id */
    id: string;
  };

  type InterfaceInfo = {
    createTime?: string;
    createUserId?: string;
    deletedFlag?: number;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    updateUserId?: string;
    url?: string;
  };

  type InterfaceInfoParam = {
    createUserId?: string;
    description: string;
    id: string;
    method: string;
    name: string;
    requestHeader: string;
    requestParams: string;
    responseHeader: string;
    status?: number;
    updateUserId?: string;
    url: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserInfoVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserInfoVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type queryByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type QueryInterfaceInfoParam = {
    currentPage: number;
    description?: string;
    name?: string;
    pageSize: number;
    start?: number;
    url?: string;
  };

  type queryUserInfoByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type UserInfoVO = {
    id?: string;
    token?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserLoginParam = {
    userAccount: string;
    userPassword: string;
  };

  type UserQueryParam = {
    currentPage: number;
    id?: string;
    mpOpenId?: string;
    pageSize: number;
    start?: number;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterParam = {
    checkPassword: string;
    mpOpenId?: string;
    unionId?: string;
    userAccount: string;
    userAvatar?: string;
    userName?: string;
    userPassword: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserUpdateParam = {
    id?: string;
    userAvatar?: string;
    userName: string;
    userProfile?: string;
  };
}

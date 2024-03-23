declare namespace API {
  type ChangePasswordParam = {
    confirmPassword: string;
    id: string;
    userPassword: string;
  };

  type CommonResultInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type CommonResultListInterfaceInfoApplyRecordVO = {
    code?: number;
    data?: InterfaceInfoApplyRecordVO[];
    message?: string;
  };

  type CommonResultListInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
  };

  type CommonResultListUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
  };

  type CommonResultlong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type CommonResultobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type CommonResultPageDepartmentVO = {
    code?: number;
    data?: PageDepartmentVO;
    message?: string;
  };

  type CommonResultPageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type CommonResultPageInterfaceInfoApply = {
    code?: number;
    data?: PageInterfaceInfoApply;
    message?: string;
  };

  type CommonResultPageInterfaceInfoApplyVO = {
    code?: number;
    data?: PageInterfaceInfoApplyVO;
    message?: string;
  };

  type CommonResultPageUserInfoVO = {
    code?: number;
    data?: PageUserInfoVO;
    message?: string;
  };

  type CommonResultPageUserInterfaceInfo = {
    code?: number;
    data?: PageUserInterfaceInfo;
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

  type CommonResultUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
  };

  type CommonResultVoid = {
    code?: number;
    message?: string;
  };

  type deleteByIdUsingDELETE1Params = {
    /** id */
    id: string;
  };

  type deleteByIdUsingDELETEParams = {
    /** id */
    id?: number;
  };

  type deleteDepartmentUsingDELETEParams = {
    /** id */
    id: string;
  };

  type DepartmentAddParam = {
    deptName: string;
    parentId: string;
  };

  type DepartmentEditParam = {
    deptName: string;
    id: string;
    parentId: string;
  };

  type DepartmentPageParam = {
    current: number;
    deptName?: string;
    pageSize: number;
    start?: number;
  };

  type DepartmentVO = {
    createTime?: string;
    deletedFlag?: boolean;
    deptName?: string;
    id?: string;
    parentDeptName?: string;
    parentId?: string;
    updateTime?: string;
  };

  type getHistoryListUsingGETParams = {
    /** interfaceInfoApplyId */
    interfaceInfoApplyId: string;
  };

  type HeaderObject = {
    key?: string;
    value?: string;
  };

  type InterfaceInfo = {
    createTime?: string;
    createUserId?: string;
    deletedFlag?: number;
    description?: string;
    id?: number;
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

  type InterfaceInfoApply = {
    auditStatus?: string;
    codeJson?: string;
    createTime?: string;
    createUserId?: string;
    deletedFlag?: number;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    processInstanceId?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    updateTime?: string;
    updateUserId?: string;
    url?: string;
  };

  type InterfaceInfoApplyParam = {
    codeJson: string;
    createUserId?: string;
    description: string;
    id?: string;
    method: string;
    name: string;
    requestHeader: string;
    requestParams: string;
    responseHeader: string;
    updateUserId?: string;
    url: string;
  };

  type InterfaceInfoApplyQueryParam = {
    createUserName?: string;
    current: number;
    currentUserId?: string;
    pageSize: number;
    processInstanceIds?: string[];
    start?: number;
  };

  type InterfaceInfoApplyRecordVO = {
    auditResult?: string;
    auditUserId?: string;
    auditUserName?: string;
    createTime?: string;
    createUserId?: string;
    createUserName?: string;
    id?: string;
    interfaceInfoApplyId?: string;
    processNode?: string;
    processNodeId?: string;
    updateTime?: string;
  };

  type InterfaceInfoApplyVO = {
    auditStatus: string;
    createTime?: string;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
  };

  type InterfaceInfoApproveParam = {
    auditOpinion?: string;
    auditResult?: string;
    auditUserId?: string;
    createUserId?: string;
    id: string;
    processInstanceId: string;
  };

  type InterfaceInfoInvokeParam = {
    headers?: HeaderObject[];
    id: string;
    userRequestParams?: string;
  };

  type InterfaceInfoParam = {
    createUserId?: string;
    description: string;
    id?: number;
    method: string;
    name: string;
    requestHeader: string;
    requestParams: string;
    responseHeader: string;
    status?: number;
    updateUserId?: string;
    url: string;
  };

  type InterfaceInfoReApplyParam = {
    codeJson: string;
    createUserId?: string;
    description: string;
    id: string;
    method: string;
    name: string;
    requestHeader: string;
    requestParams: string;
    responseHeader: string;
    updateUserId?: string;
    url: string;
  };

  type InterfaceInfoVO = {
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
    totalNum?: number;
    updateTime?: string;
    updateUserId?: string;
    url?: string;
  };

  type MyInterfaceInfoApplyQueryParam = {
    auditStatus?: string;
    current: number;
    currentUserId?: string;
    description?: string;
    method?: string;
    name?: string;
    pageSize: number;
    start?: number;
  };

  type onlineInterfaceInfoUsingPUTParams = {
    /** id */
    id?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type outlineInterfaceInfoUsingPUTParams = {
    /** id */
    id?: number;
  };

  type PageDepartmentVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: DepartmentVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
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
    total?: number;
  };

  type PageInterfaceInfoApply = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfoApply[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageInterfaceInfoApplyVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfoApplyVO[];
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

  type PageUserInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type queryByIdUsingGET1Params = {
    /** id */
    id: string;
  };

  type queryByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type QueryInterfaceInfoParam = {
    current: number;
    description?: string;
    method?: string;
    name?: string;
    pageSize: number;
    start?: number;
    status?: number;
    url?: string;
  };

  type queryUserInfoByIdUsingGETParams = {
    /** id */
    id: string;
  };

  type QueryUserInterfaceInfoListParam = {
    interfaceInfoId?: string;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    userId?: string;
  };

  type QueryUserInterfaceInfoParam = {
    current: number;
    id?: string;
    interfaceInfoId?: string;
    leftNum?: number;
    pageSize: number;
    start?: number;
    status?: number;
    totalNum?: number;
    userId?: string;
  };

  type UserInfoVO = {
    id?: string;
    token?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPermissionList?: string[];
    userProfile?: string;
    userRole?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    deletedFlag?: number;
    id?: string;
    interfaceInfoId?: string;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: string;
  };

  type UserInterfaceInfoAddParam = {
    id?: string;
    interfaceInfoId: string;
    leftNum?: number;
    totalNum?: number;
    userId: string;
  };

  type UserInterfaceInfoUpdateParam = {
    id: string;
    leftNum: number;
    status?: number;
    totalNum: number;
    updateTime?: string;
  };

  type UserLoginParam = {
    userAccount: string;
    userPassword: string;
  };

  type UserQueryParam = {
    current: number;
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

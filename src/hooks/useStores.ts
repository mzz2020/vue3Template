// start ---- store Type
export interface ObjectAnyProp<P> {
  [key: string]: P;
}

export interface SocketProps {
  isConnected: boolean;
  message: string;
  reconnectError: boolean;
  heartBeatInterval: number;
  heartBeatTimer: NodeJS.Timer | number;
}

export type UserLoginType = 'user' | 'wechat' | 'mobile'

export interface RegisterParamsProps {
  type: UserLoginType;
  mobilePhone: string;
  password: string;
}

export interface RegionProps {
  code: number;
  name: string;
}
// 用户登陆信息
export interface UserProps {
  isLogin: boolean;
  _id?: string;
  type?: UserLoginType;
  account?: string;
  wechat?: string;
  mobilePhone?: string;
  verificationCode?: number;
  imageUrl?: string;
  nickName?: string;
  sex?: number;
  region?: RegionProps;
  birthday?: string;
  signature?: string;
  realNameAuthentication?: string;
}

export interface UsersProps {
  user: UserProps;
}

export type ErrorType = 'loading' | 'success' | 'fail'
export interface ErrorProps {
  status: boolean;
  message?: string;
  type?: ErrorType;
  duration?: number;
}

export interface GlobalDataProps {
  https?: ObjectAnyProp<any>;
  token?: string;
  error?: ErrorProps;
}

export interface StateFnProps<S, T> {
  (state: S, params: T): void;
}

export interface VideoListCommodityTagProps {
  text?: string;
  color?: string;
  icon?: string;
}

export interface VideoListCommodityProps {
  price?: number;
  sold?: number;
  discount?: number;
  coupons?: number;
  discription?: string;
  tag?: VideoListCommodityTagProps[];
  activity?: VideoListCommodityTagProps[];
}

export interface VideoListProps {
  _id: string;
  poster?: string;
  src?: string;
  commodity?: VideoListCommodityProps;
}

export interface VideoStateVideoListProps {
  data: ObjectAnyProp<VideoListProps>;
  isLoaded: boolean;
}

export interface VideoStateProps {
  swipeItemIndexOne?: number;
  swipeItemIndexTwo?: number;
  videoList: VideoStateVideoListProps;
}

export interface EvaluationListProps {
  _id?: string;
  imgUrl?: string;
  user?: string;
  content?: string;
  giveALikeCount?: number;
}

export interface EvaluationTagListProps {
  text?: string;
  count?: number;
}


export type GlobalAllProps = GlobalDataProps & UsersProps & VideoStateProps
// end ---- store Type

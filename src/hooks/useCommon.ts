// 公用
export interface ObjectString {
  [key: string]: string;
}

export interface ObjectAny {
  [key: string]: any;
}

// start ---- axios method Type
export type methodType = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

// 用户接口
export interface ApiProp {
  name: string;
  url: string;
  method: methodType;
}
export type ApisProp = ApiProp[]

// https接口
export interface HttpFnProp<C> {
  (params: ObjectString, isFromData: boolean, config: C, url: string, method: methodType): any;
}
export interface HttpsProp<C> {
  [key: string]: HttpFnProp<C>;
}
// end ---- axios method Type

// ProductBtnGroup
export interface ProductBtnGroupProps {
  isGiveALike: boolean;
  giveALikeCount: number;
  commentsCount: number;
  cratBadgeIndex: null | number;
}

// popupData 弹出层
export type PositionType = 'top' | 'bottom' | 'left' | 'right'
export interface PopupDataProps {
  show: boolean;
  position: PositionType;
  title: string;
}

// share 分享框
export interface ShareProps {
  name?: string;
  description?: string;
  icon?: string;
  className?: string;
}

// 横向轮播Ref
export interface SwipeRefProps {
  [key: string]: HTMLElement;
}

// details 宝贝详情
export interface DetailsDataProps {
  photoUrl?: string;
}
export type DetailssDataProps = DetailsDataProps[]

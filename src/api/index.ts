import { service } from '@/utils/axios'

// IMAGE
// upload image
export function uploadImage(data: any): Promise<API.APIResult<any>> {
  return service({ url: '/staff/cdn/image/upload', method: 'post', data })
}

// USER
// user login api
export function loginApi(data: API.LoginParams): Promise<API.LoginResult> {
  return service({ url: '/staff/account/login', method: 'post', data })
}
// user list
export function getUserList(params: API.UserListParams): Promise<API.UserListResult> {
  return service({ url: '/staff/user/search', method: 'get', params })
}
// update user is active
export function postUserIsActive(data: API.UserIsActiveParams): Promise<API.APIResult<null>> {
  return service({ url: '/staff/user/update_is_active', method: 'post', data })
}

// INFORMATION
// Information list
export function getInformationList(data: API.InformationListParams): Promise<API.InformationListResult> {
  return service({ url: '/staff/article/list', method: 'post', data })
}
// Information add
export function postAddInformation(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/create', method: 'post', data })
}
// Information delete
export function postDeleteInformation(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/delete', method: 'post', data })
}
// Information change status
export function postChangeInformationStatus(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/change/isactive', method: 'post', data })
}
// Information detail by id
export function postInformationDetailById(data: { id: number }): Promise<API.InformationDetailResult> {
  return service({ url: '/staff/article/detail', method: 'post', data })
}
// Information update
export function postInformationUpdate(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/update', method: 'post', data })
}
// Information translate
export function postInformationTranslate(data: { id: number }): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/translate/chinese', method: 'post', data })
}

// INFORMATION LABEL  
// Information label list
export function getInformationLabelList(params: API.PageState): Promise<API.InformationLabelListResult> {
  return service({ url: '/staff/article/tag/all', method: 'get', params })
}
// Information label add
export function postAddInformationLabel(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/tag/add', method: 'post', data })
}
// Information label update
export function postUpdateInformationLabel(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/tag/update', method: 'post', data })
}
// Information label search
export function getSearchInformationLabel(params: any): Promise<API.InformationLabelListResult> {
  return service({ url: '/staff/article/tag/search', method: 'get', params })
}

// INFORMATION SPECIAL TOPIC
// Information special topic list
export function getInformationSpecialTopicList(params: any): Promise<API.InformationSpecialTopicListResult> {
  return service({ url: '/staff/article/collection/all', method: 'get', params })
}
// Information special topic add
export function postAddInformationSpecialTopic(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/collection/add', method: 'post', data })
}
// Information special topic update
export function postUpdateInformationSpecialTopic(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/collection/update', method: 'post', data })
}
// Information special topic disable
export function postDisableInformationSpecialTopic(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/article/collection/disable', method: 'post', data })
}
// Information special topic search
export function getSearchInformationSpecialTopic(params: any): Promise<API.InformationSpecialTopicListResult> {
  return service({ url: '/staff/article/collection/search', method: 'get', params })
}

// NEWS FLASH
// News Flash list
export function postNewsFlashList(data: any): Promise<API.NewsFlashListResult> {
  return service({ url: '/staff/breaking-news/list', method: 'post', data })
}
// News Flash delete
export function postDeleteNewsFlash(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/breaking-news/delete', method: 'post', data })
}
// News Flash change status
export function postChangeNewsFlashStatus(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/breaking-news/change/isactive', method: 'post', data })
}
// News Flash update
export function postUpdateNewsFlash(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/breaking-news/update', method: 'post', data })
}
// News Flash source list
export function getNewsFlashSourceList(data: any): Promise<API.NewsFlashSourceListResult> {
  return service({ url: '/staff/spider-logs/list', method: 'post', data })
}

// HOME
// home page data
export function getHomeAllList(data: any): Promise<API.HomeAllListResult> {
  return service({ url: '/staff/home/getAllList', method: 'post', data })
}

// AD
// ad list
export function getAdList(params: any): Promise<API.AdListResult> {
  return service({ url: '/staff/advertise/list', method: 'get', params })
}
// ad create
export function postCreateAd(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/advertise/add', method: 'post', data })
}
// ad update
export function postUpdateAd(data: any): Promise<API.APIResult<null>> {
  return service({ url: '/staff/advertise/update', method: 'post', data })
}

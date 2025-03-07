declare namespace API {
    interface APIResult<T> {
        code: number
        data: T
        msg: string
    }

    interface PageState {
        page: number
        size: number
        total?: number
    }

    interface UserType {
        id: number
        username: string
        uuid: string
        email: string
        password: string
        secondPassword: string
        vsysAddress: string
        solanaAddress: string
        tonAddress: string
        phantomAddress: string
        isActive: boolean
        actionDays: number
        actionToday: boolean
        createdAt: string
        updatedAt: string
    }

    interface InformationInfoType {
        id: number
        titleEn: string
        titleZh: string
        titleZhHans: string
        titleKr: string
        titleEs: string
        descriptionEn: string
        descriptionZh: string
        descriptionZhHans: string
        descriptionKr: string
        descriptionEs: string
        contentEn: string
        contentZh: string
        contentZhHans: string
        contentKr: string
        contentEs: string
        author: string
        createdAt: string
        updatedAt: string
        collectionIds: number[]
        tagIds: number[]
        isActive: boolean
        coverImageUrl: string
    }

    interface InformationLabelType {
        id: number
        name: string
        isActive: boolean
        createdAt: string
        updatedAt: string
    }

    interface InformationSpecialTopicType {
        id: number
        nameEn: string
        nameZh: string
        nameZhHans: string
        nameKr: string
        nameEs: string
        descriptionEn: string
        descriptionZh: string
        descriptionZhHans: string
        descriptionKr: string
        descriptionEs: string
        backgroundImageUrl: string
        isActive: boolean
        createdAt: string
        updatedAt: string
    }

    interface NewsFlashInfoType {
        id: number
        titleZh: string
        titleZhHans: string
        titleKr: string
        titleEs: string
        titleEn: string
        contentZh: string
        contentZhHans: string
        contentKr: string
        contentEs: string
        contentEn: string
        isActive: boolean
        createdAt: string
        author: string
        updatedAt: string
        link: string
        source: string
        score: number
    }

    interface NewsFlashSourceType {
        id: number
        createdAt: string
        endTime: string
        itemsCount: number
        status: string
        taskId: string
        totalCount: number
    }

    interface HomeAllDataType {
        id: number
        createdAt: string
        userNumber: number
        informationNumber: number
        newsFlashNumber: number
        aiNumber: number
    }

    interface AdType {
        id: number
        createdAt: string
        updatedAt: string
        title: string
        imageUrl: string
        language: "en" | "zh" | "kr" | "es" | "zh_hans"
        url: string
        isActive: boolean
    }

    interface LoginParams {
        name: string
        password: string
    }

    type LoginResult = APIResult<{
        jwtToken: string
        name: string
    }>

    interface UserListParams {
        page: number
        size: number
        nickname?: string
    }

    type UserListResult = APIResult<{
        data: UserType[]
        total: number
    }>

    interface UserIsActiveParams {
        ids: number[]
        isActive: boolean
    }

    interface InformationListParams {
        pagination: PageState
        startDate?: string
        endDate?: string
        title?: string
    }

    type InformationListResult = APIResult<{
        articles: InformationInfoType[]
        pagination: PageState
    }>

    type InformationDetailResult = APIResult<{
        article: InformationInfoType
        tags: InformationLabelType[]
        collections: InformationSpecialTopicType[]
    }>

    type InformationLabelListResult = APIResult<{
        data: InformationLabelType[]
        total: number
    }>

    type InformationSpecialTopicListResult = APIResult<{
        data: InformationSpecialTopicType[]
        total: number
    }>

    type NewsFlashListResult = APIResult<{
        data: NewsFlashInfoType[]
        total: number
    }>

    type NewsFlashSourceListResult = APIResult<{
        data: NewsFlashSourceType[]
        pagination: PageState
    }>

    type HomeAllListResult = APIResult<{
        total: number
        data: HomeAllDataType[]
    }>

    type AdListResult = APIResult<{
        Advertises: AdType[]
        total: number
    }>
}

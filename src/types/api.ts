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
        isStar: boolean
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

    type ProjectListResult = APIResult<{
        tokens: ProjectType[]
        total: number
    }>

    interface ProjectType {
        name: string;
        symbol: string;
        address: string;
        logoUri: string;
        createdAt: string;
        updatedAt: string;
        marketCap: number;
        holder: number;
        price: number;
        priceChangePercent30m: number;
        trade30m: number;
        buy30m: number;
        sell30m: number;
        volume30m: number;
        volumeBuy30m: number;
        volumeSell30m: number;
        priceChangePercent1h: number;
        trade1h: number;
        buy1h: number;
        sell1h: number;
        volume1h: number;
        volumeBuy1h: number;
        volumeSell1h: number;
        priceChangePercent2h: number;
        trade2h: number;
        buy2h: number;
        sell2h: number;
        volume2h: number;
        volumeBuy2h: number;
        volumeSell2h: number;
        priceChangePercent4h: number;
        trade4h: number;
        buy4h: number;
        sell4h: number;
        volume4h: number;
        volumeBuy4h: number;
        volumeSell4h: number;
        priceChangePercent8h: number;
        trade8h: number;
        buy8h: number;
        sell8h: number;
        volume8h: number;
        volumeBuy8h: number;
        volumeSell8h: number;
        priceChangePercent24h: number;
        trade24h: number;
        buy24h: number;
        sell24h: number;
        volume24h: number;
        volumeBuy24h: number;
        volumeSell24h: number;
        websiteUrl: string;
        xUrl: string;
        descriptionEn: string;
        DescriptionZhHans: string;
        descriptionZh: string;
        descriptionKr: string;
        descriptionEs: string;
        status: 0 | 1 | 2 | 3;
    }
}

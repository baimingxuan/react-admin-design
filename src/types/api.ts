declare namespace API {
    interface APIResult {
        list: any[]
        total: number
    }

    interface PageState {
        current: number
        pageSize: number
    }

    interface InformationInfoType {
        id: number
        create_user: string
        update_user: string
        information_title_zh: string
        information_title_en: string
        information_content_zh: string | TrustedHTML
        information_content_en: string | TrustedHTML
        information_background_img: string
        information_label: InformationLabelType[]
        information_introduction_zh: string
        information_introduction_en: string
        information_status: boolean
        information_special_topic: InformationSpecialTopicType
        create_time: string
        update_time: string
    }

    interface InformationLabelType {
        id: number
        label_name: string
        label_status: boolean
        create_time: string
        update_time: string
        create_user: string
        update_user: string
    }

    interface InformationSpecialTopicType {
        id: number
        special_topic_name_zh: string
        special_topic_name_en: string
        special_topic_introduction_zh: string
        special_topic_introduction_en: string
        special_topic_background_img: string
        special_topic_status: boolean
        create_time: string
        update_time: string
        create_user: string
        update_user: string
    }

    interface NewsFlashLabelType {
        id: number
        label_name: string
        label_status: boolean
        create_time: string
        update_time: string
        create_user: string
        update_user: string
    }

    interface NewsFlashInfoType {
        id: number
        news_flash_title_zh: string
        news_flash_content_zh: string
        news_flash_title_en: string
        news_flash_content_en: string
        news_flash_status: boolean
        create_time: string
        create_user: string
        update_time: string
        update_user: string
        news_flash_label: NewsFlashLabelType[]
        news_flash_source_url: string
        news_flash_source_site: NewsFlashSourceType
    }

    interface NewsFlashSourceType {
        id: number
        source_site_url: string
        last_collect_time: string
        collect_total_num: number
        source_status: boolean
        create_time: string
        update_time: string
        create_user: string
        update_user: string
    }

    interface UserType {
        id: number
        username: string
        wallet_address: string
        email: string
        create_time: string
        update_time: string
        like_num: number
        collect_num: number
        ai_interaction_num: number
        user_status: boolean
    }
}

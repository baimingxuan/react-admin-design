import { type FC, useState, useEffect } from 'react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Editor from './Editor'
import Toolbar from './Toolbar'
import '@wangeditor/editor/dist/css/style.css'
import { message } from 'antd'
import { uploadImage } from '@/api'
import { uploadImgToBase64 } from '@/utils/image'

const RichTextEditor: FC<{ value: string, updateValue: (value: string) => void, style?: React.CSSProperties }> = ({ value, updateValue, style }) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [html, setHtml] = useState(value)

    const toolbarConfig: Partial<IToolbarConfig> = {}
    const editorConfig: Partial<IEditorConfig> = {
        MENU_CONF: {
            uploadImage: {
                maxFileSize: 4 * 1024 * 1024,
                maxNumberOfFiles: 1,
                timeout: 5 * 1000,
                async customUpload(file: any, insertFn: any) {
                    // 将图片转换为base64
                    const base64 = await uploadImgToBase64(file as File) as { result: string }
                    uploadImage({ image: base64.result.replace(/.*;base64,/, '') }).then((res) => {
                        console.log(res)
                        if (res.code !== 0) {
                            return message.error("上传图片失败,错误码:" + res.code)
                        }
                        insertFn(res.data.imageUrl + "/article")
                    }).catch((err) => {
                        message.error('上传失败:' + err)
                    });
                }
            },
            uploadVideo: {
                maxFileSize: 4 * 1024 * 1024, // 4M
                maxNumberOfFiles: 1,
                timeout: 5 * 1000, // 5 秒
                customUpload(file: any, insertFn: any) {
                    message.error('暂不支持上传视频')
                }
            }
        }
    }

    useEffect(() => {
        setHtml(value)
    }, [value])

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    useEffect(() => {
        updateValue(html)
    }, [html])

    return (
        <div style={{ border: '1px solid #ccc', ...style }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode='default'
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode='default'
                style={{ overflowY: 'hidden' }}
            />
        </div>
    )
}

export default RichTextEditor

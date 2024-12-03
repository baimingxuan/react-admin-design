import { type FC, useState, useEffect } from 'react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Editor from './Editor'
import Toolbar from './Toolbar'
import '@wangeditor/editor/dist/css/style.css'
import { message } from 'antd'
import { uploadImage } from '@/api'

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
                customUpload(file: any, insertFn: any) {
                    let data = new FormData();
                    data.append("file", file); // file 即选中的文件 主要就是这个传的参数---看接口要携带什么参数{ key :value}
                    console.log(data.get('file'))
                    const hide = message.loading('上传中...', 0);
                    //这里写自己的接口
                    uploadImage(data).then((res: any) => {
                        const url = res.data.data.url;
                        insertFn(url); //插入图片，看返回的数据是什么
                        hide();
                    }).catch((err: any) => {
                        insertFn('https://www.baidu.com/img/bd_logo1.png')
                        hide();
                    })
                }
            },
            uploadVideo: {
                maxFileSize: 4 * 1024 * 1024, // 4M
                maxNumberOfFiles: 1,
                timeout: 5 * 1000, // 5 秒
                customUpload(file: any, insertFn: any) {
                    console.log(file)
                    insertFn('https://vjs.zencdn.net/v/oceans.mp4')
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
                style={{ height: '500px', overflowY: 'hidden' }}
            />
        </div>
    )
}

export default RichTextEditor

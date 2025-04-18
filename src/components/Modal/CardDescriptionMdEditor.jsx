import { Box, Button, useColorScheme } from '@mui/material'
import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import EditNoteIcon from '@mui/icons-material/EditNote'
const markdownValueExample = `
# Markdown Content Example!

## Hello world | TrungQuanDev - Mở Lập Trình Viên | Trello MERN Stack Advanced

![Image](https://avatars.githubusercontent.com/u/14128099?v=4)

\`\`\`javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
\`\`\`
`
function CardDescriptionMdEditor({ cardDesciptionProps, handleUpdateCardDescription }) {
    const { mode } = useColorScheme()

    // State xử lý Edit và chế độ View
    const [markdownEditMode, setMarkdownEditMode] = useState(false)
    const [cardDescription, setCardDescription] = useState(cardDesciptionProps)

    const updateCardDescription = () => {
        setMarkdownEditMode(false)
        handleUpdateCardDescription(cardDescription)
    }
    return (
        <Box sx={{ mt: -4 }}>
            {
                markdownEditMode ?
                    <Box data-color-mode={mode}>
                        <MDEditor
                            value={cardDescription}
                            onChange={setCardDescription}
                            previewOptions={{
                                rehypePlugins: [['rehypeSanitize']]
                            }} // https://www.npmjs.com/package/@uiw/react-md-editor#security
                            height={400}
                            preview="edit" // 6/3 giá trị được set tùy nhu cầu: "edit", "live", "preview"
                        // hideToolbar={true}
                        />
                        <Button
                            sx={{ alignSelf: 'flex-end' }}
                            onClick={updateCardDescription}
                            className="interceptor-loading"
                            type="button"
                            variant="contained"
                            size="small"
                            color="info"
                        >
                            Save
                        </Button>
                    </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            sx={{ alignSelf: 'flex-end' }}
                            onClick={() => setMarkdownEditMode(true)}
                            type="button"
                            variant="contained"
                            color="info"
                            size="small"
                            startIcon={<EditNoteIcon />}
                        >
                            Edit
                        </Button>
                        <Box data-color-mode={mode}>
                            <MDEditor.Markdown
                                source={cardDescription}
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    padding: cardDescription ? '10px' : '0px',
                                    border: cardDescription ? '0.5px solid rgba(0, 0, 0, 0.2)' : '',
                                    borderRadius: '8px'
                                }}
                            />
                        </Box>
                    </Box>
            }
        </Box>
    )
}

export default CardDescriptionMdEditor
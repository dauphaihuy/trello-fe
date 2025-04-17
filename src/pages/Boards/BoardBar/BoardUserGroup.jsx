import { Avatar, Box, Popover, Tooltip } from '@mui/material'
import React, { useState } from 'react'

function BoardUserGroup({ boardUsers = [], limit = 8 }) {
    // Xử lý Popover và hoặc hiện toàn bộ user trên một cái popup, tùy theo docs để tham khảo hơn:
    //  https://mui.com/material-ui/react-popover/

    const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
    const isOpenPopover = Boolean(anchorPopoverElement)
    const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined

    const handleTogglePopover = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
        else setAnchorPopoverElement(null)
    }

    // Lưu ý rằng không dùng Component AvatarGroup của MUI bởi nó không hợp tác việc chúng ta có thể custom &
    //  trigger xóa phần tử trên cuối, đơn giản là dùng Box và CSS – Style dàn Avatar cho đẹp hơn.
    return (
        <Box sx={{ display: 'flex', gap: '4px' }}>
            {/* Hiện thị giới hạn số lượng user theo số limit */}
            {[...Array(16)].map((_, index) => {
                if (index < limit) {
                    return (
                        <Tooltip title={'huy'} key={index}>
                            <Avatar
                                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                                src="https://picsum.photos/100"
                            />
                        </Tooltip>
                    )
                }
            })}
            {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
            {[...Array(16)].length > limit &&
                <Tooltip title="Show more">
                    <Box
                        aria-describedby={popoverId}
                        onClick={handleTogglePopover}
                        sx={{
                            width: 36,
                            height: 36,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            color: 'white',
                            borderRadius: '50%',
                            backgroundColor: '#a4b0be'
                        }}
                    >
                        +{[...Array(16)].length - limit}
                    </Box>
                </Tooltip>
            }
            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                onClose={handleTogglePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box sx={{ p: 2, maxWidth: '235px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {[...Array(16)].map((_, index) => (
                        <Tooltip title="trungquandev" key={index}>
                            <Avatar
                                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                                alt='test'
                                src="https://picsum.photos/100"
                            />
                        </Tooltip>
                    ))}
                </Box>
            </Popover>
        </Box >
    )
}

export default BoardUserGroup
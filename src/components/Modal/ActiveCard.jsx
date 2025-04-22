import { Box, Grid, Modal, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { singleFileValidator } from '../../utils/validator'
import { toast } from 'react-toastify'
import CancelIcon from '@mui/icons-material/Cancel'
import ToggleFocusInput from '../Form/ToggleFocusInput'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import DvrIcon from '@mui/icons-material/Dvr'
import SubjectIcon from '@mui/icons-material/Subject'
import CardActivitySection from './CardActivitySection'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearAndHideCurrentActiveCard,
    selectCurrentActiveCard,
    selectshowModalActiveCard,
    updateCurrentActiveCard
} from '../../redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI } from '../../apis'
import { updateCardInBoard } from '../../redux/activeBoard/activeBoardSlice'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ImageIcon from '@mui/icons-material/Image'
import VisuallyHiddenInput from '../Form/VisuallyHiddenInput'
import { selectCurrentUser } from '../../redux/user/UserSlice'
import { CARD_MEMBER_ACTIONS } from '../../utils/constants'
const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '4px',
    color: theme.palette.mode === 'dark' ? '#172b4d' : '#273f52',
    backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
    padding: '10px',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#33485d' : theme.palette.grey[300],
        '&.active': {
            color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
            backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
        }
    }

}))
function ActiveCard() {
    const dispatch = useDispatch()
    const activeCard = useSelector(selectCurrentActiveCard)
    console.log(activeCard)
    const isShowModal = useSelector(selectshowModalActiveCard)
    // const [isOpen, setIsOpen] = useState(true)
    // const handleOpenModal = () => setIsOpen(true)
    const handleCloseModal = () => {
        // setIsOpen(false)
        dispatch(clearAndHideCurrentActiveCard())
    }
    //func dùng chung cho các trường hợp update title, description
    const callApiUpdateCard = async (updateData) => {
        const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData)
        //b1Ghi chú: Cập nhật, lại cái card đang active trong modal hiện tại
        dispatch(updateCurrentActiveCard(updatedCard))
        //b2 Ghi chú: Cập nhật, lại cái bản ghi card trong activeBoard(nested data)
        dispatch(updateCardInBoard(updatedCard))
        return updatedCard
    }
    const onUpdateCardTitle = (newTitle) => {
        console.log(newTitle.trim())
        //goi api
        callApiUpdateCard({
            title: newTitle.trim()
        })
    }
    const onupdateCardDescription = (newDescription) => {
        console.log(newDescription)
        //goi api
        callApiUpdateCard({
            description: newDescription
        })
    }

    const onUploadCardCover = (event) => {
        console.log(123)
        console.log(event.target.files[0])
        const error = singleFileValidator(event.target.files[0])
        if (error) {
            toast.error(error)
            return
        }
        let reqData = new FormData()
        reqData.append('cardCover', event.target.files[0])
        //goi api
        toast.promise(
            callApiUpdateCard(reqData).finally(() => event.target.value = ''),
            { pending: 'Updating...' }
        )

    }
    //
    const onAddCardComment = async (commentToAdd) => {
        await callApiUpdateCard({
            commentToAdd
        })
    }
    const onUpdateCardMembers = (incomingMemberInfo) => {
        callApiUpdateCard({
            incomingMemberInfo
        })
    }
    const currentUser = useSelector(selectCurrentUser)

    return (
        <Modal
            disableScrollLock
            open={isShowModal}
            onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
            sx={{ overflowY: 'auto' }}

        >
            <Box
                sx={{
                    position: 'relative',
                    maxWidth: 900,
                    bgcolor: 'white',
                    boxShadow: 24,
                    borderRadius: '8px',
                    border: 'none',
                    outline: 0,
                    padding: '40px 20px 20px',
                    margin: '50px auto',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '12px',
                    right: '10px',
                    cursor: 'pointer'
                }}>
                    <CancelIcon color='error' sx={{ '&:hover': { color: 'error.light' } }}
                        onClick={handleCloseModal}
                    />
                </Box>
                {activeCard?.cover && <Box sx={{ mb: 4 }}>
                    <img
                        style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover' }}
                        src={activeCard?.cover}
                        alt="card-cover"
                    />
                </Box>}
                <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Feature 01: Xỉ tiêu đề của Card */}
                    <ToggleFocusInput
                        inputFontSize="22px"
                        value={activeCard?.title}
                        onChangedValue={onUpdateCardTitle}
                    />
                </Box>

                {/* //left size */}
                <Grid container spacing={2} sx={{ mb: 3 }} >
                    <Grid size={{ xs: 12, sm: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>
                                Members
                            </Typography>
                            {/* Feature 02: Xỉ các thành viên của Card */}
                            <CardUserGroup
                                cardMemberIds={activeCard?.memberIds}
                                onUpdateCardMembers={onUpdateCardMembers}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <SubjectIcon />
                                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
                                    Description
                                </Typography>
                            </Box>
                            {/* Feature 03: Xỉ mô tả của Card */}
                            <CardDescriptionMdEditor
                                cardDesciptionProps={activeCard?.description}
                                handleUpdateCardDescription={onupdateCardDescription}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <DvrIcon />
                                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
                                    Activity
                                </Typography>
                            </Box>
                            {/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
                            <CardActivitySection
                                onAddCardComment={onAddCardComment}
                                cardComments={activeCard?.comments} />
                        </Box>
                    </Grid>
                    {/* right size */}
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add to card</Typography>
                        <Stack direction={'column'} spacing={1}>
                            {!activeCard?.memberIds?.includes(currentUser?._id) &&
                                <SidebarItem
                                    onClick={() => onUpdateCardMembers({
                                        userId: currentUser._id,
                                        action: CARD_MEMBER_ACTIONS.ADD
                                    })}
                                    className='active'>
                                    <PersonOutlineIcon fontSize="small" /> Join
                                </SidebarItem>
                            }

                            <SidebarItem className='active' component='label'>
                                <ImageIcon fontSize="small" />
                                cover
                                <VisuallyHiddenInput fontSize="small" type="file" onChange={onUploadCardCover} />
                            </SidebarItem>
                            <SidebarItem><AttachFileIcon fontSize="small" /> Attachments</SidebarItem>
                            <SidebarItem><LocalOfferIcon fontSize="small" /> Labels</SidebarItem>
                            <SidebarItem><TaskAltIcon fontSize="small" /> Checklists   </SidebarItem>
                            <SidebarItem><WatchLaterIcon fontSize="small" /> Dates</SidebarItem>
                            <SidebarItem><AutoFixHighIcon fontSize="small" /> Custom Fields</SidebarItem>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ActiveCard
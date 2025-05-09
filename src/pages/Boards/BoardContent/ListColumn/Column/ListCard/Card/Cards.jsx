import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { showModalActiveCard, updateCurrentActiveCard } from '../../../../../../../redux/activeCard/activeCardSlice'
function Cards({ card }) {
    const dispatch = useDispatch()
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: card?._id, data: { ...card } })
    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
        transition,
        border: isDragging ? '1px solid #030303' : ''
    }
    const shouldShowCardActions = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }
    const setActiveCard = () => {
        dispatch(updateCurrentActiveCard(card))
        dispatch(showModalActiveCard())
    }
    return (
        <Card
            onClick={setActiveCard}
            ref={setNodeRef}
            style={style}
            {...attributes} {...listeners}
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset',
                height: card?.FE_PlaceholderCard ? '0px' : 'block'
            }}>
            {card?.cover && <CardMedia
                sx={{ height: 140 }}
                image={card?.cover}
                title=""
            />}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{card?.title}</Typography>
            </CardContent>
            {shouldShowCardActions() &&
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>}
                    {!!card?.comments?.length && <Button size="small" startIcon={<ChatBubbleOutlineIcon />}>{card?.comments?.length}</Button>}
                    {!!card?.attachments?.length && <Button size="small" startIcon={<AttachFileIcon />}>{card?.attachments?.length}</Button>}
                </CardActions>}
        </Card>
    )
}

export default Cards
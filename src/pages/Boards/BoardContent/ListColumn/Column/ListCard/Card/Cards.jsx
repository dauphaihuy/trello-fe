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

function Cards() {
    return (
        <Card sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
            overflow: 'unset'
        }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/seed/picsum/200/300"
                title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Huydz </Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<ChatBubbleOutlineIcon />}>20</Button>
                <Button size="small" startIcon={<AttachFileIcon />}>20</Button>
            </CardActions>
        </Card>
    )
}

export default Cards
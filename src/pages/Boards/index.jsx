import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Pagination,
    PaginationItem,
    Stack,
    styled,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import AppBar from '../../components/AppBar/AppBar'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import Create from './create'
import { fetchBoardsAPI } from '../../apis'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '../../utils/constants'
const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    padding: '12px 16px',
    borderRadius: '4px',

    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
    },
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#0066d4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
    }
}))
function Boards() {
    const [boards, setBoards] = useState(null)
    // Ý nghĩa phần trang từ URL với MUI: https://mui.com/material-ui/react-pagination/#router-integration
    //tổng toàn bộ số lượng bản ghi boards có trong database mà phía be trả vè fe dùng tính toán phân trang
    const [totalBoards, setTotalBoards] = useState(null)
    const location = useLocation()
    // Parse chuỗi string trong location và trích xuất URLSearchParams trong JavaScript
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams

    const query = new URLSearchParams(location.search)

    // Lấy giá trị từ query, default sẽ là 1 nếu không tồn tại page tủy chọn.
    // Mặc định kiến thức khác bạn có thể tham khảo thêm parseInt (hệ cơ số 10).
    const page = parseInt(query.get('page') || '1', 10)

    const updateStateData = (res) => {
        setBoards(res.boards || [])
        setTotalBoards(res.totalBoards || 0)
    }
    useEffect(() => {
        // Fake tạm 16 cái item thay cho boards
        // const fakeData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        // setBoards([...Array(16)].map((_, i) => i))
        // setTotalBoards(100)

        // Khi cái url thay đổi thì sẽ chuyển trang, thì cái location.search sẽ tự hook
        // useLocation của react-router-dom dùng để đổi theo, đồng nghĩa hàm useEffect sẽ thay
        // đổi theo cái page khi cái location.search đã thay đổi dependencies của useEffect
        // Gọi API lấy danh sách boards ở đây...
        fetchBoardsAPI(location.search).then(updateStateData)
    }, [location])
    const afterCreateNewBoard = () => {
        //fetch lai danh sach board
        fetchBoardsAPI(location.search).then(updateStateData)
    }
    if (!boards) {
        return <Loading caption="Loading Boards..." />
    }
    return (
        <Container disableGutters maxWidth={false}>
            <AppBar />
            <Box sx={{ paddingX: 2, my: 4 }}>
                <Grid container spacing={2}>
                    <Grid size={{ sx: 12, sm: 3 }}>
                        <Stack direction={'column'} spacing={1}>
                            <SidebarItem className='active'>
                                <SpaceDashboardIcon fontSize='small' />
                                Boards
                            </SidebarItem>
                            <SidebarItem className='active'>
                                <ListAltIcon fontSize='small' />
                                Boards
                            </SidebarItem>
                            <SidebarItem className='active'>
                                <HomeIcon fontSize='small' />
                                Home
                            </SidebarItem>
                            <Divider sx={{ my: 1 }} />
                            <Stack direction={'column'} spacing={1}>
                                <Create afterCreateNewBoard={afterCreateNewBoard} />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 9 }} >
                        <Typography variant='h4' sx={{ fontweight: 'bold', mb: 3 }}>Your boards:</Typography>
                        {
                            boards?.length === 0 &&
                            <Typography variant='span' sx={{ fontweight: 'bold', mb: 3 }}>No result found!</Typography>
                        }
                        <Grid container spacing={2}>
                            {
                                boards.map(b =>
                                    <Grid size={{ xs: 2, sm: 3, md: 3 }} key={b._id}>
                                        <Card sx={{ width: '250px' }}>
                                            {/* <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box> */}
                                            <CardMedia component={'img'} height={'100'} image='https://picsum.photos/600' />
                                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                                <Typography gutterBottom variant='h6' component='div'>{b?.title}</Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                                >
                                                    {b?.description}
                                                </Typography>
                                                <Box
                                                    component={Link}
                                                    to={`/boards/${b?._id}`}
                                                    sx={{
                                                        mt: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        color: 'primary.main',
                                                        '&:hover': { color: 'primary.light' }
                                                    }}
                                                >
                                                    Go to board <ArrowRightIcon fontSize="small" />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            }
                        </Grid>
                        {
                            (totalBoards > 0) &&
                            <Box sx={{ my: 5, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Pagination
                                    size="large"
                                    color="secondary"
                                    showFirstButton
                                    showLastButton
                                    // Giá trị prop count của component Pagination là để hiển thị tổng số lượng số,
                                    // công thức là Vậy Tổng số lượng bản ghi chia số lượng bản ghi muốn hiển thị trên 1 page
                                    //  (ví dụ thông thường là 12, 24, 26, 18,...), sau cùng là làm tròn số lên bảng ham Math.ceil
                                    count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                                    page={page}
                                    renderItem={(item) => (
                                        <PaginationItem
                                            component={Link}
                                            to={`/boards/${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                                            {...item}
                                        />
                                    )}
                                />
                            </Box>
                        }
                    </Grid>
                </Grid>

            </Box>
        </Container >
    )
}

export default Boards
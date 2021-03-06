import { Box, Card, createStyles, fade, Grid, InputBase, makeStyles, Theme, Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward, AccountCircle } from '@material-ui/icons';
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import RatingDisplay from "../../lib/ui/components/ratingDisplay";
import ReviewSummary from "../../lib/ui/components/reviewSummary";
import useSWR from 'swr'
import axios from 'axios'
import {ReviewViewModel} from '../../lib/ui/viewModels/reviewViewModels'
import { useUser } from '../../lib/ui/hooks'

export default function Profile() {
    const classes = useStyles();

    const router = useRouter();
    const user = useUser();

    // Fetch user reviews
    const { data } = useSWR('/api/review', async (url)=>{
        const res = await axios.get(url)
        if (res.data) {
            return res.data.data as ReviewViewModel[]
        }else{
            router.push('/login')
        }
    })

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user])

    return(
        <Box className={classes.main}>
            <Grid container direction='row' alignItems="center" justify='center' wrap="nowrap" className={classes.mainGrid}>

                <Grid container direction='column' alignItems="center" wrap="nowrap" justify='center' >

                    <Grid item>
                        <AccountCircle className={classes.accIcon}/>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.accName}>{user?<>{user.name}</>:<>Loading ...</>}</Typography>
                    </Grid>

                    <Grid item className={classes.accRatingContainer}>
                        <Grid container direction='row' alignItems="center" wrap="nowrap" justify='space-between' className={classes.accRatingPts}>

                            <Grid item>
                                <Grid container direction='row' alignItems="center" wrap="nowrap">
                                    <ArrowUpward fontSize="small" className={classes.accUpvotes}/>
                                    <Typography className={classes.accUpvotes}># upvotes</Typography>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction='row' alignItems="center" wrap="nowrap" justify='center' className={classes.accRatingPts}>
                                    <RatingDisplay rating={5} size="large" color="secondary"/>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction='row' alignItems="center" wrap="nowrap">
                                    <ArrowDownward fontSize="small" className={classes.accDownvotes}/>
                                    <Typography className={classes.accDownvotes}># downvotes</Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container direction='row' alignItems="center" wrap="nowrap">
                        <Typography className={classes.textWhite}>University: {user?.university?.name}</Typography>
                    </Grid>
                    <Grid container direction='row' alignItems="center" wrap="nowrap">
                        <Typography className={classes.textWhite}>Study Program: {user?.studyprogram?.name}</Typography>
                    </Grid>
                    <Grid container direction='row' alignItems="center" wrap="nowrap" className={classes.spacer}>
                        <Typography className={classes.textWhite}>Reviews: {data?data.length:0}</Typography>
                    </Grid>
                    
                    <Card className={classes.cardMain}>
                        <Grid container direction='column' alignItems="center" wrap="nowrap" className={classes.cardGrid}>
                            <Grid container direction='row' alignItems="center" wrap="nowrap" className={classes.searchRow}>
                                <Grid item className={classes.search} justify="center">
                                    <InputBase
                                    placeholder="Search Review..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    fullWidth={true}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    />
                                </Grid>
                                {/* <Grid item justify='flex-end'>
                                    <Grid container direction='row' alignItems="center" wrap="nowrap">
                                        <Button>
                                            <Typography className={classes.addReview} onClick={handleOpenModal}>Add Review</Typography>
                                            <AddCircle fontSize="large" className={classes.addReviewIcon}/>
                                        </Button>

                                        <Modal
                                        open={open}
                                        onClose={handleCloseModal}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                        className={classes.modal}
                                        >
                                            <Fade in={open}>
                                                <Grid container direction='column' alignItems="center" justify='center' wrap="nowrap">
                                                    <Grid container direction='row' justify='flex-end' className={classes.closeModalBox}>
                                                        <Button onClick={handleCloseModal} size="small" className={classes.closeModalButton}>
                                                            <ClearRounded fontSize='large' className={classes.closeModalIcon}/>
                                                        </Button>
                                                    </Grid>
                                                    <ReviewMake/>
                                                </Grid>
                                            </Fade>
                                        </Modal>

                                    </Grid>
                                </Grid> */}
                            </Grid>

                            {/* v Reviews Here v */}
                            {data?.map((val, index) => (
                                <Grid item className={classes.cardItem}> <ReviewSummary
                                    review={val} key={index*8900} forUpdate={true}
                                /></Grid>
                            ))}
                            {/* ^ Reviews Here ^ */}
                            
                        </Grid>
                    </Card>

                </Grid>

            </Grid>
        </Box>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: 10,
            padding: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
        },
        mainGrid: {
            width: '90%'
        },
        accIcon: {
            fontSize: 150,
            color: theme.palette.primary.contrastText,
        },
        accName: {
            fontSize: 50,
            color: theme.palette.primary.contrastText,
        },
        accRatingContainer: {
            minWidth: '32%',
            paddingBottom: theme.spacing(2),
        },
        accRatingPts: {
            width: '100%',
        },
        ratingIcon: {
            color: theme.palette.secondary.main,
        },
        accUpvotes: {
            color: theme.palette.secondary.main,
        },
        accDownvotes: {
            color: theme.palette.info.main,
        },
        spacer: {
            paddingBottom: theme.spacing(1)
        },
        cardMain: {
            minWidth: '100%',
            minHeight: 300,
        },
        cardGrid: {
            padding: theme.spacing(1),
        },
        cardItem: {
            minWidth: '97%',
            paddingBottom: theme.spacing(2),
        },
        searchRow: {
            paddingTop: theme.spacing(0.2),
            paddingBottom: theme.spacing(2),
            width: '97%'
        },
        search: {
            marginLeft: '37%',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.info.main, 1),
            '&:hover': {
                backgroundColor: fade(theme.palette.info.main, 0.60),
            },
            margin:'auto',
            width: '25%',
        },
        inputRoot: {
            color: theme.palette.secondary.contrastText,
        },
        inputInput: {
            padding: theme.spacing(1.5),
            paddingLeft: '33%',
            transition: theme.transitions.create('width'),
            width: '100%',
        },
        addReview: {
            color: theme.palette.primary.main,
            paddingRight: theme.spacing(0.5),
        },
        addReviewIcon: {
            color: theme.palette.primary.main,
        },
        textWhite: {
            color: theme.palette.primary.contrastText,
        },

        modal:{
            overflow:'scroll',
            width: '100%',
            height: '100%'
        },
        closeModalBox: {
            paddingTop: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        closeModalButton: {
            backgroundColor: theme.palette.secondary.main,
        },
        closeModalIcon: {
            color: theme.palette.primary.contrastText,
        },
    }))
import { Backdrop, Box, Button, Card, createStyles, Fade, fade, Grid, InputBase, makeStyles, Modal, Theme, Typography} from "@material-ui/core";
import { ArrowDownward, ArrowUpward, AccountCircle, Grade, AddCircle } from '@material-ui/icons';
import React from "react";
import ReviewMake from "../../lib/ui/components/reviewMake";
import ReviewSummary from "../../lib/ui/components/reviewSummary";

export default function Company() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return(
        <Box className={classes.main}>
            <Grid container direction='row' alignItems="center" justify='center' wrap="nowrap" className={classes.mainGrid}>

                <Grid container direction='column' alignItems="center" wrap="nowrap" justify='center' >

                    <Grid item>
                        <AccountCircle className={classes.accIcon}/>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.accName}>Company X</Typography>
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
                                    <Grade fontSize="large" className={classes.ratingIcon}/>
                                    <Grade fontSize="large" className={classes.ratingIcon}/>
                                    <Grade fontSize="large" className={classes.ratingIcon}/>
                                    <Grade fontSize="large" className={classes.ratingIcon}/>
                                    <Grade fontSize="large" className={classes.ratingIcon}/>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction='row' alignItems="center" wrap="nowrap">
                                    <ArrowDownward fontSize="small" className={classes.accDownvotes}/>
                                    <Typography className={classes.accDownvotes}># downvotes</Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' alignItems="center" wrap="nowrap" justify='center' className={classes.accAvgSalaryContainer}>
                            <Typography className={classes.avgSalaryText}>Avg. Salary: $69,420</Typography>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' alignItems="center" wrap="nowrap" className={classes.spacer}>
                        <Typography className={classes.textWhite}>Reviews: #Reviews</Typography>
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
                                <Grid item justify='flex-end'>
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
                                                <ReviewMake/>
                                            </Fade>
                                        </Modal>

                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* v Reviews Here v */}

                            <Grid item className={classes.cardItem}> <ReviewSummary/></Grid>
                            <Grid item className={classes.cardItem}> <ReviewSummary/></Grid>
                            <Grid item className={classes.cardItem}> <ReviewSummary/></Grid>

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
        accAvgSalaryContainer: {
            paddingBottom: theme.spacing(2),
        },
        avgSalaryText: {
            fontSize: 30,
            color: theme.palette.primary.contrastText,
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow:'scroll',
            width: '100%',
        },
    }))
    
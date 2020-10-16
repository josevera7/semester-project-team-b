import { Box, Button, Card, CardHeader, createStyles, Divider, FormControl, Grid, IconButton, 
    InputAdornment, InputLabel, makeStyles, OutlinedInput, Theme, Typography } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

export default function LoginPage() {
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        // const axios = require('axios')

        // axios.post('').then(res => {
        //     console.log(res.data)
        // })
    };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <Box className={(classes.main)}>
            <Grid
            container
            direction="column"
            alignContent="center"
            justify="center"
            wrap='wrap'
            spacing={4}
            >
                <Grid item className={classes.gridItem}>
                    <Typography className={(classes.titlePage)}>InternView</Typography>
                </Grid>
                <Card className={classes.card}>
                    <CardHeader className={(classes.titleCard)} title="Sign In"/>
                    <Grid item className={classes.gridItem}>
                        <FormControl className={(classes.input)} variant="outlined" fullWidth={true} required={true}>
                            <InputLabel htmlFor="outlined-email">Email</InputLabel>
                            <OutlinedInput
                                id="email-input"
                                label="Email"
                                value={values.email}
                                onChange={handleChange('email')}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <FormControl className={(classes.input)} variant="outlined" fullWidth={true} required={true}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    label="Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Button variant="contained" color="secondary">
                            <Typography>Log In</Typography>
                        </Button>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Button color="primary">
                            <Typography>Forgot Password?</Typography>
                        </Button>
                    </Grid>
                    <Divider/>
                    <br/>
                    <Grid item className={classes.gridItem}>
                        <Typography>Don't have an account?</Typography>
                        <Link  href="/register">
                            <Button variant="contained" color="primary">
                                <Typography>Create New Account</Typography>
                            </Button>
                        </Link>
                    </Grid>
                </Card>
            </Grid>
        </Box>     
    )   
}

const useStyles = makeStyles((theme: Theme) =>    
    createStyles({
    main: {
        margin: theme.spacing(1),
        
    },
    card: {
        padding: theme.spacing(4, 12),
        textAlign: "center",
        color: theme.palette.text.primary,
        minWidth: 500,
        minHeight: 500,
        maxHight: 600
    },
    container: {
        gridGap: theme.spacing(3),
    },
    titlePage: {
        textAlign: "center",
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(6),
        color: theme.palette.text.hint,
        fontSize: 40,
        fontWeight: 500,
    },
    titleCard: {
        color: theme.palette.text.hint,
    },
    gridItem: {
        paddingBottom: theme.spacing(1)
    },
    input: {
        backgroundColor: theme.palette.info.main,
        margin: theme.spacing(1)
    },
  }),
);
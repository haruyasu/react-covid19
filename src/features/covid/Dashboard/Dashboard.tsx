import React, {useEffect} from 'react'
import styles from './DashBoard.module.css'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Container, Grid} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {selectDaily, fetchAsyncGetDaily} from '../covidSlice'
import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import PieChart from '../PieChart/PieChart';
import SwitchCountry from '../SwitchCountry/SwitchCountry';


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    content: {
        marginTop: 85
    }
}))

const DashBoard:React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const daily = useSelector(selectDaily)
    useEffect(() => {
        dispatch(fetchAsyncGetDaily('japan'))
    }, [dispatch])

    return (
        <div>
            <AppBar position='absolute'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        新型コロナウイルス感染状況
                    </Typography>
                    <div>
                        <Typography variant='body1'>
                            {
                                new Date(daily[daily.length - 1].Date).toDateString()
                            }
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>

            <Container className={classes.content}>
                <div className={styles.container}>
                    <SwitchCountry />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Chart />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <PieChart />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Cards />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default DashBoard

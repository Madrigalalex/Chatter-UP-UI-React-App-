import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ChitChat from '../components/chitchat/ChitChat';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

import ChitChatSkeleton from '../util/ChitChatSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';


class user extends Component {
    state = {
        profile: null,
        chitchatIdParam: null,
        chitchats: null

    };

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const chitchatId = this.props.match.params.chitchatId;

        axios.get('/chitchat')
        .then ((res)=> {
            this.setState({

                chitchats: res.data
            });
        })
        .catch ((err) => console.log(err));

        if (chitchatId) this.setState({chitchatIdParam: chitchatId});

        this.props.getUserData(handle);

        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch(err => console.log(err));
    }


    render() {
        const {chitchats, loading} = this.props.data;
        const {chitchatIdParam} = this.state;
        
        const chitchatsMarkup = loading ? (
            <ChitChatSkeleton/>
        ) : chitchats === null ? (
            <p> No content from this user</p>
         ) :  !chitchatIdParam ? (
            chitchats.map((chitchat) => <ChitChat key={chitchat.chitchatId} chitchat={chitchat}/>)
        ) : (
            chitchats.map(chitchat =>{
                if (chitchat.chitchatId !== chitchatIdParam)
                    return <ChitChat key={chitchat.chitchatId} chitchat={chitchat}/>

                else return <ChitChat key={chitchat.chitchatId} chitchat={chitchat} openDialog/>
            })
        )
        

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                {chitchatsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (<StaticProfile profile={this.state.profile}/>)}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});



export default connect(mapStateToProps,{getUserData})(user);

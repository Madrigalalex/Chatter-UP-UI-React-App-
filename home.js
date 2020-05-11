import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


import ChitChat from '../components/chitchat/ChitChat';
import Profile from '../components/profile/Profile';
import ChitChatSkeleton from '../util/ChitChatSkeleton';


import {connect} from 'react-redux';
import {getChitChats} from '../redux/actions/dataActions'

class home extends Component {
    
    componentDidMount(){
        this.props.getChitChats();
    }

    render() {
        const {chitchats, loading} = this.props.data;
        let recentChitChatMarkup = !loading ? (
            chitchats.map((chitchat) => <ChitChat key={chitchat.chitchatId} chitchat={chitchat}/>)
            ) : (<ChitChatSkeleton/>)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    {recentChitChatMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes ={
    getChitChats: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});


export default connect(mapStateToProps, {getChitChats})(home);

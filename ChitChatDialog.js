import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';

//Material UI

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//Redux and components
import {connect} from 'react-redux'
import {getChitChat, clearErrors} from '../../redux/actions/dataActions';
import  LikeButton  from './LikeButton';

const styles = (theme) => ({
    ...theme.spreadThis,

    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },

    dialogContent: {
        padding: 20
    },

    closeButton: {
        position: 'absolute',
        left: '90%'
    },

    expandButton: {
        position: 'absolute',
        left: '90%'
    },

    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }


});

class ChitChatDialog extends Component {

    state = {
        open: false,
        oldPath: '',
        newPath: '',
    }

componentDidMount(){
    if (this.props.openDialog){
        this.handleOpen();
    }
}

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const {userHandle, chitchatId} = this.props;
        const newPath = `/users/${userHandle}/chitchat/${chitchatId}`;

        if(oldPath === newPath) oldPath = `/user/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({open: true, oldPath, newPath});
        this.props.getChitChat(this.props.chitchatId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
        this.props.clearErrors();
    }

    render(){
        const {
            classes, 
            chitchat: {
                chitchatId, 
                body, 
                createdAt, 
                likeCount, 
                commentCount, 
                userImage, 
                userHandle,
                comments
            }, 
            UI: {loading} 
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>            
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                <Typography color="primary" component={Link} variant="h5">
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body1">
                    {body}
                </Typography>
                <LikeButton chitchatId={chitchatId}/>
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm chitchatId={chitchatId}/>
                <Comments comments={comments}/>
            </Grid>
        );

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand chitchat" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )

    }
}

ChitChatDialog.propTypes ={
    clearErrors: PropTypes.func.isRequired,
    getChitChat: PropTypes.func.isRequired,
    chitchatId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    chitchat: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    chitchat: state.data.chitchat,
    UI: state.UI
})

const mapActionsToProps = {
    getChitChat,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ChitChatDialog));
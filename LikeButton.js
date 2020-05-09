import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

//Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

//Redux
import {connect} from 'react-redux';


//
import {likeChitChat, unlikeChitChat} from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedChitChat = () => {
        if (this.props.user.likes && 
            this.props.user.likes.find(
                (like) => like.chitchatId === this.props.chitchatId
                )
            )
            return true;
        else return false;

    };

    likeChitChat = () => {
        this.props.likeChitChat(this.props.chitchatId)
    }

    unlikeChitChat = () => {
        this.props.unlikeChitChat(this.props.chitchatId)
    }

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) :  this.likedChitChat() ? (
                <MyButton tip="Undo like" onClick={this.unlikeChitChat}>
                    <FavoriteIcon color="primary"/>
               </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeChitChat}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            
        );

        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    chitchatId: PropTypes.string.isRequired,
    likeChitChat: PropTypes.func.isRequired,
    unlikeChitChat: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeChitChat,
    unlikeChitChat
}


export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

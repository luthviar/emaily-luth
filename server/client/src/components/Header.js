import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return [
                    <li key="1"> <Payments /> </li>,
                    <li key="3"> 
                        <a>
                            Credits: {this.props.auth.credits}
                        </a>
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>                
                ];
        }
    }

    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/' } 
                        className="left brand-logo"
                    >
                        Emaily Luth
                    </Link>
                    <ul className="right">
                        { this.renderContent() }    
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToPropos({auth}) {
    return { auth };
}

export default connect(mapStateToPropos)(Header);
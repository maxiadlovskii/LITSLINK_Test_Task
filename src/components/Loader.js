import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
    render() {
        return (
            <div>
                <h2>Loadding...</h2>
            </div>
        );
    }
}

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;

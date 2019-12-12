import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import  CollectionPreview from '../preview-collection/preview-collection.component';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';


import './collections-overview.styles.scss';


const CollectionOverView = ({ collections }) => (
    <div className='collections-overview'>
    
    {
        collections.map(({id,...otherCollectionsProps}) => (
            <CollectionPreview key={id} {...otherCollectionsProps}></CollectionPreview>
        ))
    }
    
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionOverView);
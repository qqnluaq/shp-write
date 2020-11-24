module.exports.point = function ( geojson ) {
    fs = geojson.features.filter( function ( f ) {
        return f.geometry.type == 'Point' || f.geometry.type == 'MultiPoint'
    } )

    return {
        type: 'POINT',
        geometries: fs.reduce( function ( acc, f ) { 
            return f.geometry.type == 'Point' 
                ? acc.concat( [ f.geometry.coordinates ] )
                : acc.concat( f.geometry.coordinates )
        }, [] ),
        properties: fs.reduce( function ( acc, f ) { 
            return f.geometry.type == 'Point' 
                ? acc.concat( f.properties )
                : acc.concat( f.geometry.coordinates.map( function () { return f.properties } ) )
        }, [] ),
    }
}

module.exports.line = function ( geojson ) {
    fs = geojson.features.filter( function ( f ) {
        return f.geometry.type == 'LineString' || f.geometry.type == 'MultiLineString'
    } )

    return {
        type: 'POLYLINE',
        geometries: fs.map( f => [ f.geometry.coordinates ] ),
        properties: fs.map( f => f.properties ),
    }
}

module.exports.polygon = function ( geojson ) {
    fs = geojson.features.filter( function ( f ) {
        return f.geometry.type == 'Polygon' || f.geometry.type == 'MultiPolygon'
    } )

    return {
        type: 'POLYGON',
        geometries: fs.map( f => f.geometry.coordinates ),
        properties: fs.map( f => f.properties ),
    }
}

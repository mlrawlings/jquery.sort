//jquery.sort.js
(function( $ ) {
  
	var defaultSortFunction = function( a, b ) {
		return $( a ).text().localeCompare( $( b ).text() );
	};

	// sort using binary search insertion O(n(log n))
	$.fn.sort = function( fn ) {
		var sorter = fn || defaultSortFunction;
		var sorted = $('<div>');
		this.data( 'sortFunction', sorter );
		sorted.data( 'sortFunction', sorter );
		this.children().each( function( index, child ) {
			sorted.insertSorted( child );
		});
		this.append( sorted.children() );
		return this;
	};

	// binary search insertion O(log n)
	$.fn.insertSorted = function( toInsert ) {
		var sorter = this.data( 'sortFunction' );
		var children = this.children();
		if( sorter && children.length > 0 ) {
			var startIndex = 0;
			var stopIndex  = children.length - 1;
		    var middle     = Math.floor( (stopIndex + startIndex) / 2 );
		    var inserted   = false;
			while( inserted == false ) {
				var element = children.get( middle );
				var compare = sorter( toInsert, element )
				if( compare < 0 ) {
		        	stopIndex = middle - 1;
		        	if( middle == startIndex ) {
		        		$( element ).before( toInsert );
		        		inserted = true;
		        	}
		        }
		        else if ( compare > 0 ) {
		        	startIndex = middle + 1;
		        	if( middle == stopIndex ) {
		        		$( element ).after( toInsert );
		        		inserted = true;
		        	}
		        }
		        else {
		        	$( element ).after( toInsert );
		        	inserted = true;
		        }
		        middle = Math.floor( (stopIndex + startIndex) / 2 );
			}
		}
		else {
			this.append( toInsert );
		}
		return this;
	};

}( jQuery ));

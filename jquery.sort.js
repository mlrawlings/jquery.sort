//jquery.sort.js
(function( $ ) {
	
	var defaultSortFunction = function( a, b ) {
		return $( a ).text().localeCompare( $( b ).text() );
	};

	// sort using binary search insertion O(n(log n))
	$.fn.sortChildren = function( fn ) {
		var sorter = fn || defaultSortFunction;
		this.data( 'sortFunction', sorter );
		this.children().sort( sorter ).appendTo( this );
		return this;
	};

	// binary search insertion O(log n)
	$.fn.insertSorted = function( toInsert ) {
		var sorter, children, startIndex, stopIndex, middle, inserted;
		sorter = this.data( 'sortFunction' );
		children = this.children();
		if( sorter && children.length > 0 ) {
			startIndex = 0;
			stopIndex  = children.length - 1;
		    middle     = Math.floor( (stopIndex + startIndex) / 2 );
			while( !inserted ) {
				var element = children.get( middle );
				var compare = sorter( toInsert, element )
				if( compare < 0 ) {
		        	stopIndex = middle - 1;
		        	if( middle == startIndex ) {
		        		inserted = $( element ).before( toInsert );
		        	}
		        }
		        else if ( compare > 0 ) {
		        	startIndex = middle + 1;
		        	if( middle == stopIndex ) {
		        		inserted = $( element ).after( toInsert );
		        	}
		        }
		        else {
		        	inserted = $( element ).after( toInsert );
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

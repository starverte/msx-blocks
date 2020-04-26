( function( wp ) {
	
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	var registerBlockType = wp.blocks.registerBlockType;
	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-element/
	 */
	var el = wp.element.createElement;
	/**
	 * Retrieves the translation of text.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-i18n/
	 */
	var __ = wp.i18n.__;

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/#registering-a-block
	 */
	registerBlockType( 'msx-blocks/alert', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Alert', 'msx-blocks' ),

		/**
		 * An icon property should be specified to make it easier to identify a block.
		 * These can be any of WordPress’ Dashicons, or a custom svg element.
		 */
		icon: 'warning',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},
		
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'div',
			},
			context: {
				type: 'string',
				default: 'info'
			},
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			return [
				el(
					wp.editor.InspectorControls,
					null,
					el(
						wp.components.PanelBody,
						{
							title: __( 'Context', 'msx-blocks' ),
							initialOpen: true
						},
						el(
							wp.components.SelectControl,
							{
								options: [
									{ label: 'Information', value: 'info' },
									{ label: 'Primary', value: 'primary' },
									{ label: 'Secondary', value: 'secondary' },
									{ label: 'Success', value: 'success' },
									{ label: 'Danger', value: 'danger' },
									{ label: 'Warning', value: 'warning' },
									{ label: 'Light', value: 'light' },
									{ label: 'Dark', value: 'dark' },
								],
								onChange: function( context ) {
									props.setAttributes( { context: context } );
								}
							}
						)
					)
				),
				el( wp.editor.RichText, {
					tagName: 'div',  // The tag here is the element output and editable in the admin
					className: 'alert alert-' + props.attributes.context,
					value: props.attributes.content, // Any existing content, either from the database or an attribute default
					formattingControls: [ 'bold', 'italic' ], // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange: function( content ) {
						props.setAttributes( { content: content } );
					},
					placeholder: __( 'Alert' ),
				} )
			];
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function( props ) {
			return el( wp.editor.RichText.Content, {
				tagName: 'div',
				value: props.attributes.content,
				className: 'alert alert-' + props.attributes.context,
			} );
		}
	} );
} )(
	window.wp
);

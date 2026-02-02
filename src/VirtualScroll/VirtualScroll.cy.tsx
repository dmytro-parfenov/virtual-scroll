import {VirtualScroll} from './VirtualScroll'

describe('<VirtualScroll />', () => {
    const getScrollContainer = () => cy.get('[data-cy=scroll-container]');

    const itemKey = (index: number) => index;

    const renderItem = (index: number) => index;

    it('should only display items that fit within the container size plus buffer size', () => {
        // Arrange
        cy.mount(<VirtualScroll itemsCount={1000}
                                containerHeight={400}
                                itemHeight={50}
                                itemKey={itemKey}
                                renderItem={renderItem}
                                bufferSize={2}
                                throttleDelayMs={100}/>);

        // Assert
        cy.findAllByRole('listitem').should('have.length', 11);
    });

    it('should display the first item when not scrolled', () => {
        // Arrange
        cy.mount(<VirtualScroll itemsCount={1000}
                                containerHeight={400}
                                itemHeight={50}
                                itemKey={itemKey}
                                renderItem={renderItem}
                                bufferSize={2}
                                throttleDelayMs={100}/>)

        // Act
        getScrollContainer().scrollTo('bottom');

        // Assert
        cy.contains(/^0$/).should('exist');
    })

    it('should display the last item when scrolled to the bottom', () => {
        // Arrange
        cy.mount(<VirtualScroll itemsCount={1000}
                                containerHeight={400}
                                itemHeight={50}
                                itemKey={itemKey}
                                renderItem={renderItem}
                                bufferSize={2}
                                throttleDelayMs={100}/>);

        // Act
        getScrollContainer().scrollTo('bottom');

        // Assert
        cy.contains(/^999$/).should('exist');
    })

    it('should not display first and last item when scrolled to the center', () => {
        // Arrange
        cy.mount(<VirtualScroll itemsCount={1000}
                                containerHeight={400}
                                itemHeight={50}
                                itemKey={itemKey}
                                renderItem={renderItem}
                                bufferSize={2}
                                throttleDelayMs={100}/>);

        // Act
        getScrollContainer().scrollTo('center');

        // Assert
        cy.contains(/^0$/).should('not.exist');
        cy.contains(/^999$/).should('not.exist');
    });
})
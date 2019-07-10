import React, { Component } from "react";
import { fetchArticles } from "./API";

class ClassComponent extends Component {
  state = {
    data: [],
    query: "redux",
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query)  {
      this.setData();
    }
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  cancelRequest = () => {
    if (this.controller) this.controller.abort();
  }

  setData = async () => {
    this.cancelRequest();
    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      const { hits: data } = await fetchArticles(this.state.query, signal);
      this.setState({data});
    } catch(error) {}
  }

  handleInputChange = e => this.setState({query: e.target.value});

  render() {
    return (
      <>
        <h2>Class Component</h2>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <ul>
          {this.state.data.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ClassComponent;

// <DT><A HREF="https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889" ADD_DATE="1562666631" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACJUlEQVQ4jXWSTU8TURSGzzm9d8q00/lqq1M0onErG7BE+QFC/EhAhZW6x/+gLtW9JKjwA8CdhAaxuuwKE0QWLHFFF8iQUp3bmbn3upjYCAlndc49b05unvdF37XhjNJaI+L/DQCwbCaiXC6X9VLKvoKIiAgApJRKKURkmVpE0W8RAwACeK6NiNl7p9OJUwUAhQHDNE2lFCOiKBL1en36/gMhRBiGi+/fKaWIKIqiqanpkdFRznljba3VahUKJviu7ZSsi4NBo7GmtdZa37t7x2BU9uxq2fu5t6e13t3dvXrlsm0VfNcGzymVPSfPc7WgGoahlHJ19WPRzHOWe/L4kZQyjuMXz58BwLmK7zklQkSllGEYdsn5vrXV64mJicmRkVGt9fj4eJIknPNisdhnRQCAiGmaWlZpfb3xpdlkjM3Mzg4PX/t1eNhu7wOAUqrPmvrIGcsJ0Xu7sICID2dm5uaefm1+5tw4ZQ71fRAi4px92tj4sb1dqw06jrP5bdM0Ta11miTZRwCAMvUfEV8aGrpeH0tSOT//BgCWlhaD84FlWYgY1GrZXa01lD2nMJC/eWNsZ2en2+2+fvXywmCwsrwcVCsfVpaPj4+PjsJ2e//25K28wSu+i75rSyld1zXy+Z7omebAwcFBmqacc8/34zjWShGRUqrT6RARek4po6T+LTjnWTSSJMmClAFljGmtWbZjjJ2igYiGcQLRCR/OSvipEwDwF4XPDKJwKZt1AAAAAElFTkSuQmCC">Making Sense of React Hooks - Dan Abramov - Medium</A>
// <DT><A HREF="https://reactjs.org/docs/react-component.html#componentwillunmount" ADD_DATE="1562739362" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVQ4jZ2TT0iTARjGf98f3aebm186cTaWfY4wDUEESxETDcGQSE8llIQR0VWogx48BnmwjoGHqEOHwrJb6LIOiUadCtNilnM6x5bNuf9/vg42U/Bi7+l9ed/nhed9nleoqqrq0nV9HLBxuFgXBGFAUlX13V5wcV0jJU0dJIN+MtFtAAxWG+WdvUj5BuIb3txoEdAu7wUr5XbK2rrxTj7G3tNP+PuXnUlnLb7Xzzl64Qpx/xpx32oOYhM0TdNzVUljG4IkEZidBuDknVEQBBbuDgJQ2tSBnskQnJ/Z5SHuJZWOhJFMZgDU+mayyQTZRBy1vhkA2WQhHQnvO4ScS/LMKpa6RspauzjS0EJBRSXBORcAx68NUt7Zi1Grxu96RdTjJrW1CYCkqupIafM5Krr72Jh+iVJWQSr0m+XxewiSRCq0ydrkE4yVJ0hvb+GbmsBx+SaCKBL1uHcoWM+eZ2lsmMjyIr8+vEVSFESDQs3QA2qG7iMaFGSTmeCci8jyIktjw1hbu/7dIBuPUehwAmBy1iIXFZMI+Ih63EQ9bhIBH3KRBZOzFoBCh5NsIgGAoGmaLhoKcFy6gVJqQ6lwEJx1oWdSrE48AsDe0w+ihLWlk9jqD+KBdVaePiSbiLFPxkKHE/vFq0R+fqPkTDvof1u6TnB+BpNWjefZOFGPe1cFSVXVkV1rOWuI+71sTL0g8H6KktNtZLbDfB29TejzRwRRRFIKiK2vHOyDbDKJbNzxQb5aip5OI8gy+ap1R3OjmWwyebAPAEILnyjv7MVyqoFUOMTi2DAAx/pukVdkAVFk483kvgWCpmlrHP4Tc+ETgeuA7z/AXmDgD9AW23M4cke8AAAAAElFTkSuQmCC">React.Component – React</A>
// <DT><A HREF="https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html" ADD_DATE="1562739370" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVQ4jZ2TT0iTARjGf98f3aebm186cTaWfY4wDUEESxETDcGQSE8llIQR0VWogx48BnmwjoGHqEOHwrJb6LIOiUadCtNilnM6x5bNuf9/vg42U/Bi7+l9ed/nhed9nleoqqrq0nV9HLBxuFgXBGFAUlX13V5wcV0jJU0dJIN+MtFtAAxWG+WdvUj5BuIb3txoEdAu7wUr5XbK2rrxTj7G3tNP+PuXnUlnLb7Xzzl64Qpx/xpx32oOYhM0TdNzVUljG4IkEZidBuDknVEQBBbuDgJQ2tSBnskQnJ/Z5SHuJZWOhJFMZgDU+mayyQTZRBy1vhkA2WQhHQnvO4ScS/LMKpa6RspauzjS0EJBRSXBORcAx68NUt7Zi1Grxu96RdTjJrW1CYCkqupIafM5Krr72Jh+iVJWQSr0m+XxewiSRCq0ydrkE4yVJ0hvb+GbmsBx+SaCKBL1uHcoWM+eZ2lsmMjyIr8+vEVSFESDQs3QA2qG7iMaFGSTmeCci8jyIktjw1hbu/7dIBuPUehwAmBy1iIXFZMI+Ih63EQ9bhIBH3KRBZOzFoBCh5NsIgGAoGmaLhoKcFy6gVJqQ6lwEJx1oWdSrE48AsDe0w+ihLWlk9jqD+KBdVaePiSbiLFPxkKHE/vFq0R+fqPkTDvof1u6TnB+BpNWjefZOFGPe1cFSVXVkV1rOWuI+71sTL0g8H6KktNtZLbDfB29TejzRwRRRFIKiK2vHOyDbDKJbNzxQb5aip5OI8gy+ap1R3OjmWwyebAPAEILnyjv7MVyqoFUOMTi2DAAx/pukVdkAVFk483kvgWCpmlrHP4Tc+ETgeuA7z/AXmDgD9AW23M4cke8AAAAAElFTkSuQmCC">You Probably Don&#39;t Need Derived State – React Blog</A>
// <DT><A HREF="https://reactjs.org/blog/2019/02/06/react-v16.8.0.html" ADD_DATE="1562739373" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVQ4jZ2TT0iTARjGf98f3aebm186cTaWfY4wDUEESxETDcGQSE8llIQR0VWogx48BnmwjoGHqEOHwrJb6LIOiUadCtNilnM6x5bNuf9/vg42U/Bi7+l9ed/nhed9nleoqqrq0nV9HLBxuFgXBGFAUlX13V5wcV0jJU0dJIN+MtFtAAxWG+WdvUj5BuIb3txoEdAu7wUr5XbK2rrxTj7G3tNP+PuXnUlnLb7Xzzl64Qpx/xpx32oOYhM0TdNzVUljG4IkEZidBuDknVEQBBbuDgJQ2tSBnskQnJ/Z5SHuJZWOhJFMZgDU+mayyQTZRBy1vhkA2WQhHQnvO4ScS/LMKpa6RspauzjS0EJBRSXBORcAx68NUt7Zi1Grxu96RdTjJrW1CYCkqupIafM5Krr72Jh+iVJWQSr0m+XxewiSRCq0ydrkE4yVJ0hvb+GbmsBx+SaCKBL1uHcoWM+eZ2lsmMjyIr8+vEVSFESDQs3QA2qG7iMaFGSTmeCci8jyIktjw1hbu/7dIBuPUehwAmBy1iIXFZMI+Ih63EQ9bhIBH3KRBZOzFoBCh5NsIgGAoGmaLhoKcFy6gVJqQ6lwEJx1oWdSrE48AsDe0w+ihLWlk9jqD+KBdVaePiSbiLFPxkKHE/vFq0R+fqPkTDvof1u6TnB+BpNWjefZOFGPe1cFSVXVkV1rOWuI+71sTL0g8H6KktNtZLbDfB29TejzRwRRRFIKiK2vHOyDbDKJbNzxQb5aip5OI8gy+ap1R3OjmWwyebAPAEILnyjv7MVyqoFUOMTi2DAAx/pukVdkAVFk483kvgWCpmlrHP4Tc+ETgeuA7z/AXmDgD9AW23M4cke8AAAAAElFTkSuQmCC">React v16.8: The One With Hooks – React Blog</A>
// <DT><A HREF="https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib" ADD_DATE="1562739378" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACLklEQVQ4jZWSz08TURDH5719j3Yb2yaikQOeVBIsiXW1WA8KwYMkkhBC4hrhH5De8C/BH4macMC7NRE8UGtCKJQi5QBBSikShOABpBxqF3bbN+NhDWyiF+cwmfnOdy4zHxYMheF/gnsbIvqnyaufLnDOGWOMMa/PtZ6IRCQQERGVUo7jBAIBpdSJ1efzEVG9XhdCIBKiklJy03yYmpycy2afjYwIIWKx2MeJidxcNjs7G41G37x+lUgkqtVfTU0X3ieTPT0PeGvr1fb22MZGaWjoydPh4Y67dzo7O9ZLpe3t73t7e83NFwcHHhOiYVzv7r5/8POAM4DV1YJpmu+SyRuGIYRcWlp+ZJr9/f3rxbXx8Q8tLS2N587H47e3trYW8gscAKSUnHNCrCtlHVmRSCSfX+zqugcA+fyiruux2M14/NbS8vJhufznSohIRMCIMeY49s7OtnVkCSlXvq5829xMJBJXLl9KpVIAIIioVqsBgK7rmiZ0v14qlfr6+gAgGAqXy4e5XG5wYKBarc7Pf+Ga5IyzaPRaJpPp7e2dmpo6tm3DMKanMzMzM21tEVT19Kc0ABQKhWKxqOt+7Wxjo8a5QhwdHX3+4mWlUgmHwlzjx7adTn/e39/f3f0hNDH2dmytUPA1NDC/HnAcB5UCgDPBYK1Ws23b/aoeCAghlFKWZUkp/X4/EbFgKHxCBCK6tUuE+2/GGOeciNyp8DLjzV6iEPGUJe/MS97filv/BsLuKh2umYW0AAAAAElFTkSuQmCC">Making Sense of React Hooks - DEV Community 👩‍💻👨‍💻</A>
// <DT><A HREF="https://medium.com/@nitinpatel_20236/unit-testing-custom-react-hooks-caa86f58510" ADD_DATE="1562766993" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACJUlEQVQ4jXWSTU8TURSGzzm9d8q00/lqq1M0onErG7BE+QFC/EhAhZW6x/+gLtW9JKjwA8CdhAaxuuwKE0QWLHFFF8iQUp3bmbn3upjYCAlndc49b05unvdF37XhjNJaI+L/DQCwbCaiXC6X9VLKvoKIiAgApJRKKURkmVpE0W8RAwACeK6NiNl7p9OJUwUAhQHDNE2lFCOiKBL1en36/gMhRBiGi+/fKaWIKIqiqanpkdFRznljba3VahUKJviu7ZSsi4NBo7GmtdZa37t7x2BU9uxq2fu5t6e13t3dvXrlsm0VfNcGzymVPSfPc7WgGoahlHJ19WPRzHOWe/L4kZQyjuMXz58BwLmK7zklQkSllGEYdsn5vrXV64mJicmRkVGt9fj4eJIknPNisdhnRQCAiGmaWlZpfb3xpdlkjM3Mzg4PX/t1eNhu7wOAUqrPmvrIGcsJ0Xu7sICID2dm5uaefm1+5tw4ZQ71fRAi4px92tj4sb1dqw06jrP5bdM0Ta11miTZRwCAMvUfEV8aGrpeH0tSOT//BgCWlhaD84FlWYgY1GrZXa01lD2nMJC/eWNsZ2en2+2+fvXywmCwsrwcVCsfVpaPj4+PjsJ2e//25K28wSu+i75rSyld1zXy+Z7omebAwcFBmqacc8/34zjWShGRUqrT6RARek4po6T+LTjnWTSSJMmClAFljGmtWbZjjJ2igYiGcQLRCR/OSvipEwDwF4XPDKJwKZt1AAAAAElFTkSuQmCC">Unit Testing Custom React Hooks - Nitin Patel - Medium</A>
// <DT><A HREF="https://reactjs.org/docs/hooks-faq.html#how-to-test-components-that-use-hooks" ADD_DATE="1562767217" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVQ4jZ2TT0iTARjGf98f3aebm186cTaWfY4wDUEESxETDcGQSE8llIQR0VWogx48BnmwjoGHqEOHwrJb6LIOiUadCtNilnM6x5bNuf9/vg42U/Bi7+l9ed/nhed9nleoqqrq0nV9HLBxuFgXBGFAUlX13V5wcV0jJU0dJIN+MtFtAAxWG+WdvUj5BuIb3txoEdAu7wUr5XbK2rrxTj7G3tNP+PuXnUlnLb7Xzzl64Qpx/xpx32oOYhM0TdNzVUljG4IkEZidBuDknVEQBBbuDgJQ2tSBnskQnJ/Z5SHuJZWOhJFMZgDU+mayyQTZRBy1vhkA2WQhHQnvO4ScS/LMKpa6RspauzjS0EJBRSXBORcAx68NUt7Zi1Grxu96RdTjJrW1CYCkqupIafM5Krr72Jh+iVJWQSr0m+XxewiSRCq0ydrkE4yVJ0hvb+GbmsBx+SaCKBL1uHcoWM+eZ2lsmMjyIr8+vEVSFESDQs3QA2qG7iMaFGSTmeCci8jyIktjw1hbu/7dIBuPUehwAmBy1iIXFZMI+Ih63EQ9bhIBH3KRBZOzFoBCh5NsIgGAoGmaLhoKcFy6gVJqQ6lwEJx1oWdSrE48AsDe0w+ihLWlk9jqD+KBdVaePiSbiLFPxkKHE/vFq0R+fqPkTDvof1u6TnB+BpNWjefZOFGPe1cFSVXVkV1rOWuI+71sTL0g8H6KktNtZLbDfB29TejzRwRRRFIKiK2vHOyDbDKJbNzxQb5aip5OI8gy+ap1R3OjmWwyebAPAEILnyjv7MVyqoFUOMTi2DAAx/pukVdkAVFk483kvgWCpmlrHP4Tc+ETgeuA7z/AXmDgD9AW23M4cke8AAAAAElFTkSuQmCC">Hooks FAQ – React</A>
// <DT><A HREF="https://medium.com/@dawchihliou/testing-react-hooks-6d3ae95cd838" ADD_DATE="1562767241" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACJUlEQVQ4jXWSTU8TURSGzzm9d8q00/lqq1M0onErG7BE+QFC/EhAhZW6x/+gLtW9JKjwA8CdhAaxuuwKE0QWLHFFF8iQUp3bmbn3upjYCAlndc49b05unvdF37XhjNJaI+L/DQCwbCaiXC6X9VLKvoKIiAgApJRKKURkmVpE0W8RAwACeK6NiNl7p9OJUwUAhQHDNE2lFCOiKBL1en36/gMhRBiGi+/fKaWIKIqiqanpkdFRznljba3VahUKJviu7ZSsi4NBo7GmtdZa37t7x2BU9uxq2fu5t6e13t3dvXrlsm0VfNcGzymVPSfPc7WgGoahlHJ19WPRzHOWe/L4kZQyjuMXz58BwLmK7zklQkSllGEYdsn5vrXV64mJicmRkVGt9fj4eJIknPNisdhnRQCAiGmaWlZpfb3xpdlkjM3Mzg4PX/t1eNhu7wOAUqrPmvrIGcsJ0Xu7sICID2dm5uaefm1+5tw4ZQ71fRAi4px92tj4sb1dqw06jrP5bdM0Ta11miTZRwCAMvUfEV8aGrpeH0tSOT//BgCWlhaD84FlWYgY1GrZXa01lD2nMJC/eWNsZ2en2+2+fvXywmCwsrwcVCsfVpaPj4+PjsJ2e//25K28wSu+i75rSyld1zXy+Z7omebAwcFBmqacc8/34zjWShGRUqrT6RARek4po6T+LTjnWTSSJMmClAFljGmtWbZjjJ2igYiGcQLRCR/OSvipEwDwF4XPDKJwKZt1AAAAAElFTkSuQmCC">Testing React Hooks - Daw-Chih Liou - Medium</A> */}
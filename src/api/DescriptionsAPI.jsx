// export const DescriptionsAPI = () => {
//     const [stops, setStops] = useState([]); // array of all possible stops
//     const [descriptions, setDescriptions] = useState([]); // array of all possible stop descriptions
//     const [loading, setLoading] = useState(true);

//     // setStops
//     useEffect(() => {
//       const fetchStops = async () => {
//         setLoading(true);
//         try {
//           const data = await StopAPI();

//           // nulls filtered, sorted alphabetically
//           const descriptionsArray = ((data.data.map(item => item.attributes.description)).filter(n => n)).sort();

//           setStops(data.data);
//           setDescriptions(descriptionsArray)

//           console.log("descriptions:", descriptionsArray)
//         } catch (error) {
//           console.error("Failed to fetch stops: ", error);

//         } finally {
//           setLoading(false);
//         }

//       };

//       fetchStops();
//     }, []);

// }

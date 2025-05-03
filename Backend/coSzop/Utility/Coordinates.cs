namespace Utility;

public class Coordinates
{
    private const double EarthRadiusMeters = 6371000.0;
    
    public static double CalculateDistanceInMeters(double lat1, double lon1, double lat2, double lon2)
    {
        // --- Input validation (optional but recommended) ---
        if (Math.Abs(lat1) > 90 || Math.Abs(lat2) > 90 || Math.Abs(lon1) > 180 || Math.Abs(lon2) > 180)
        {
            throw new ArgumentOutOfRangeException("Invalid latitude or longitude values.");
        }

        // --- Convert degrees to radians ---
        // Math functions in C# operate on radians
        var lat1Radians = lat1 * Math.PI / 180.0;
        var lon1Radians = lon1 * Math.PI / 180.0;
        var lat2Radians = lat2 * Math.PI / 180.0;
        var lon2Radians = lon2 * Math.PI / 180.0;

        // --- Calculate differences ---
        var deltaLat = lat2Radians - lat1Radians;
        var deltaLon = lon2Radians - lon1Radians;

        // --- Apply Haversine formula ---
        // Calculate 'a', the square of half the chord length between the points
        var a = Math.Sin(deltaLat / 2.0) * Math.Sin(deltaLat / 2.0) +
                Math.Cos(lat1Radians) * Math.Cos(lat2Radians) *
                Math.Sin(deltaLon / 2.0) * Math.Sin(deltaLon / 2.0);

        // Calculate 'c', the angular distance in radians
        // Using Atan2 is generally more numerically stable than 2 * Asin(Sqrt(a))
        var c = 2.0 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1.0 - a));

        // --- Calculate the final distance ---
        var distance = EarthRadiusMeters * c;

        return distance;
    }
}
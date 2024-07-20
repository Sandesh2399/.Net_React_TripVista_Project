using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace TripVista
{
    public static class Helper
    {
        /// <summary>
        /// To return the enum from the value specified
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T GetEnumFromValue<T>(int value)
        {
            if (Enum.IsDefined(typeof(T), value))
            {
                return (T)Enum.Parse(typeof(T), value.ToString());
            }
            else
            {
                return default(T)!;
            }
        }

        /// <summary>
        /// To validate the object specified with the rules
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public static List<ValidationResult> Validate(object req)
        {
            var validationContext = new ValidationContext(req, null, null);
            var validationResults = new List<ValidationResult>();

            Validator.TryValidateObject(req, validationContext, validationResults, true);

            return validationResults.GroupBy(e => e.ErrorMessage, (key, group) =>
                new ValidationResult(key, group.First().MemberNames)).ToList(); //weed out duplicates
        }

        /// <summary>
        /// To find the value specified in dictionary for a key
        /// </summary>
        /// <param name="options"></param>
        /// <param name="selectedId"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
        public static string GetValue(this Dictionary<int, string> options, int selectedId)
        {
            if (options.ContainsKey(selectedId))
            {
                return options[selectedId];
            }
            else
            {
                throw new KeyNotFoundException($"Unable to find key '{selectedId}' in the dictionary.");
            }
        }
        /// <summary>
        /// To find the key specified in dictionary for a value
        /// </summary>
        /// <param name="options"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        /// <exception cref="ApplicationException"></exception>
      
        public static int GetKey(this Dictionary<int, string> options, string value)
        {
            if (options.ContainsValue(value))
            {
                return options.First(o => o.Value == value).Key;
            }
            else
            {
                throw new KeyNotFoundException($"Unable to find value '{value}' in the dictionary.");
            }
        }

        /// <summary>
        /// To convert UNIX timestamp with current date
        /// </summary>
        /// <param name="source"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            DateTime dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTime;
        }

        /// <summary>
        /// To identify whether the specified date is earlier to the source
        /// </summary>
        /// <param name="source"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        public static bool IsEarlierThanOrEqualTo(this DateTime source, DateTime date)
        {
            return date.ToUniversalTime().Subtract(source.ToUniversalTime()).TotalDays >= 0;
        }

        /// <summary>
        /// To identify whether specified date is in between the start and end date
        /// </summary>
        /// <param name="source"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        public static bool IsBetween(this DateTime source, DateTime startDate, DateTime endDate)
        {
            return source >= startDate && source <= endDate;
        }

        /// <summary>
        /// To identify date without timezone, nullable values to be accepted
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime WithoutTimeZone(this DateTime? dateTime)
        {
            return dateTime!.Value.WithoutTimeZone();
        }

        /// <summary>
        /// To identify the date withouth timezone
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime WithoutTimeZone(this DateTime dateTime)
        {
            if (dateTime.Kind != DateTimeKind.Unspecified)
                return new DateTime(dateTime.Ticks, DateTimeKind.Unspecified);
            return dateTime;
        }

        /// <summary>
        /// This will return the date in UTC with specified format
        /// e.g. ParseDateToUtc("MM/dd/yyyy hh:mm tt", TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time"))
        /// </summary>
        /// <param name="dateTime"></param>
        /// <param name="format"></param>
        /// <param name="tz"></param>
        /// <returns></returns>
        public static DateTime? ParseDateToUtc(this string dateTime, string format, TimeZoneInfo tz)
        {
            if (string.IsNullOrEmpty(dateTime))
            {
                return null;
            }
            else
            {
                DateTime? dt = (DateTime?)DateTime.ParseExact(dateTime, format, System.Globalization.CultureInfo.CurrentCulture);
                dt = new DateTime(dt.Value.Ticks, DateTimeKind.Unspecified);
                return TimeZoneInfo.ConvertTimeToUtc(dt.Value, tz);
            }
        }

        /// <summary>
        /// This date will identify the next date of DayOfWeek specified from the date supplied
        /// </summary>
        /// <param name="from">From Date</param>
        /// <param name="dayOfWeek">The day of week of which the date need to be identified</param>
        /// <returns></returns>
        public static DateTime NextDate(this DateTime from, DayOfWeek dayOfWeek)
        {
            int start = (int)(from.WithoutTimeZone()).DayOfWeek;
            int target = (int)dayOfWeek;
            if (target <= start)
                target += 7;
            return from.AddDays(target - start).WithoutTimeZone();
        }

        /// <summary>
        /// To identify the date of next week start from the date specified
        /// </summary>
        /// <param name="from"></param>
        /// <returns></returns>
        public static DateTime NextWeek(this DateTime from)
        {
            return from.WithoutTimeZone().NextDate(DayOfWeek.Sunday).WithoutTimeZone();
        }

        /// <summary>
        /// To identify the bi-weekly date of the week date specified
        /// </summary>
        /// <param name="from"></param>
        /// <returns></returns>
        public static DateTime NextBiweekly(this DateTime from)
        {
            var cal = new GregorianCalendar();
            var weekNum = cal.GetWeekOfYear(from.WithoutTimeZone(), CalendarWeekRule.FirstDay, DayOfWeek.Monday);
            int biweeklyKey = weekNum % 2;
            return from.AddDays(biweeklyKey * 7).WithoutTimeZone();
        }

        /// <summary>
        /// To identify the semi monthly date from the date specified
        /// </summary>
        /// <param name="from"></param>
        /// <returns></returns>
        public static DateTime NextSemiMonthly(this DateTime from)
        {
            DateTime dt = from.WithoutTimeZone();
            return dt.WithoutTimeZone().Day < 15 ?
                new DateTime(dt.Year, dt.Month, 15, 0, 0, 0, DateTimeKind.Utc).WithoutTimeZone()
                : dt.LastDayOfMonth().WithoutTimeZone();
        }

        /// <summary>
        /// To identify the last day of the month
        /// </summary>
        /// <param name="from"></param>
        /// <returns></returns>
        public static DateTime LastDayOfMonth(this DateTime from)
        {
            DateTime dt = from.WithoutTimeZone();
            bool isLastDayOfMonth = dt.AddDays(1).Month != dt.Month;
            if (isLastDayOfMonth)
            {
                dt = dt.AddMonths(1);
            }
            return new DateTime(dt.Year, dt.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(1).AddDays(-1).WithoutTimeZone();
        }

        /// <summary>
        /// Get value from list for the position specified
        /// </summary>
        /// <param name="list"></param>
        /// <param name="position"></param>
        /// <param name="currentValue"></param>
        /// <returns></returns>
        public static string GetValueOrNull(this List<string> list, int position, string currentValue)
        {
            if (list == null || list.Count < position + 1) return currentValue;
            return list[position];
        }

        /// <summary>
        /// To get the decimal value rounded to 2 decimals to use as currency
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Decimal ToCurrency(this decimal value)
        {
            return Math.Round(value, 2);
        }

        /// <summary>
        /// To get the double value rounded to 2 decimals to use as currency
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Double ToCurrency(this double value)
        {
            return Math.Round(value, 2);
        }

        /// <summary>
        /// To round the value to 4 decmial to use as Number
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Double ToNumber(this double value)
        {
            return Math.Round(value, 4);
        }

        /// <summary>
        /// To round the nullable value to 4 decmial to use as Number and for null, to return as 0
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static Double ToNumber(this double? value)
        {
            return Math.Round(value ?? 0, 4);
        }
    }
}

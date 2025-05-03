using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EFCRepositories.Migrations
{
    /// <inheritdoc />
    public partial class addAddressLngLat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Latiture",
                table: "UserAddresses",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Longitute",
                table: "UserAddresses",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latiture",
                table: "UserAddresses");

            migrationBuilder.DropColumn(
                name: "Longitute",
                table: "UserAddresses");
        }
    }
}
